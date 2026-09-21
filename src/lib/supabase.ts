import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "placeholder-key";

const realSupabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// A simple local JSON database helper
const localDbPath = path.resolve(process.cwd(), "local_db.json");

function readLocalDb() {
  if (!fs.existsSync(localDbPath)) {
    const salt = crypto.randomBytes(16).toString("hex");
    const derivedKey = crypto.scryptSync("admin123", salt, 64).toString("hex");
    const hashedPassword = `${salt}:${derivedKey}`;

    const initialDb = {
      users: [
        {
          id: "admin-id-123",
          name: "Nove Admin",
          email: "admin@nove.in",
          password: hashedPassword,
          role: "admin",
          created_at: new Date().toISOString()
        }
      ],
      orders: []
    };
    fs.writeFileSync(localDbPath, JSON.stringify(initialDb, null, 2), "utf-8");
    return initialDb;
  }
  try {
    return JSON.parse(fs.readFileSync(localDbPath, "utf-8"));
  } catch {
    return { users: [], orders: [] };
  }
}

function writeLocalDb(data: any) {
  fs.writeFileSync(localDbPath, JSON.stringify(data, null, 2), "utf-8");
}

class LocalQueryBuilder {
  private tableName: string;
  private filters: Array<(item: any) => boolean> = [];
  private orderCol: string | null = null;
  private orderAscending = true;
  private isSingle = false;
  private isInsert = false;
  private isUpdate = false;
  private insertData: any = null;
  private updateData: any = null;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(...args: any[]) {
    return this;
  }

  insert(...args: any[]) {
    this.isInsert = true;
    this.insertData = args[0];
    return this;
  }

  update(...args: any[]) {
    this.isUpdate = true;
    this.updateData = args[0];
    return this;
  }

  eq(...args: any[]) {
    const column = args[0];
    const value = args[1];
    this.filters.push((item) => item[column] === value);
    return this;
  }

  order(...args: any[]) {
    this.orderCol = args[0];
    const options = args[1];
    this.orderAscending = options?.ascending !== false;
    return this;
  }

  single(...args: any[]) {
    this.isSingle = true;
    return this;
  }

  private execute(): Promise<{ data: any; error: any }> {
    return new Promise((resolve) => {
      try {
        const db = readLocalDb();
        let tableData = db[this.tableName] || [];

        if (this.isInsert) {
          const records = Array.isArray(this.insertData) ? this.insertData : [this.insertData];
          const newRecords = records.map((rec: any) => ({
            id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
            created_at: new Date().toISOString(),
            ...rec
          }));
          
          tableData.push(...newRecords);
          db[this.tableName] = tableData;
          writeLocalDb(db);
          
          resolve({ data: this.isSingle ? newRecords[0] : newRecords, error: null });
          return;
        }

        if (this.isUpdate) {
          let updatedRecords: any[] = [];
          tableData = tableData.map((item: any) => {
            let matches = true;
            for (const filter of this.filters) {
              if (!filter(item)) matches = false;
            }
            if (matches) {
              const updatedItem = { ...item, ...this.updateData };
              updatedRecords.push(updatedItem);
              return updatedItem;
            }
            return item;
          });
          db[this.tableName] = tableData;
          writeLocalDb(db);
          
          resolve({ data: this.isSingle ? updatedRecords[0] : updatedRecords, error: null });
          return;
        }

        // SELECT query
        let filtered = [...tableData];
        for (const filter of this.filters) {
          filtered = filtered.filter(filter);
        }

        if (this.orderCol) {
          filtered.sort((a, b) => {
            const valA = a[this.orderCol!];
            const valB = b[this.orderCol!];
            if (valA < valB) return this.orderAscending ? -1 : 1;
            if (valA > valB) return this.orderAscending ? 1 : -1;
            return 0;
          });
        }

        if (this.isSingle) {
          if (filtered.length === 0) {
            resolve({ data: null, error: { message: "No row found", code: "PGRST116" } });
          } else {
            resolve({ data: filtered[0], error: null });
          }
        } else {
          resolve({ data: filtered, error: null });
        }
      } catch (err: any) {
        resolve({ data: null, error: err });
      }
    });
  }

  then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: { data: any; error: any }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected);
  }
}

class FluentWrapper {
  private tableName: string;
  private realBuilder: any;
  private localBuilder: LocalQueryBuilder;

  constructor(tableName: string, realBuilder: any) {
    this.tableName = tableName;
    this.realBuilder = realBuilder;
    this.localBuilder = new LocalQueryBuilder(tableName);
  }

  select(...args: any[]) {
    if (this.realBuilder) this.realBuilder = this.realBuilder.select(...args);
    this.localBuilder.select(...args);
    return this;
  }

  insert(...args: any[]) {
    if (this.realBuilder) this.realBuilder = this.realBuilder.insert(...args);
    this.localBuilder.insert(...args);
    return this;
  }

  update(...args: any[]) {
    if (this.realBuilder) this.realBuilder = this.realBuilder.update(...args);
    this.localBuilder.update(...args);
    return this;
  }

  eq(...args: any[]) {
    if (this.realBuilder) this.realBuilder = this.realBuilder.eq(...args);
    this.localBuilder.eq(...args);
    return this;
  }

  order(...args: any[]) {
    if (this.realBuilder) this.realBuilder = this.realBuilder.order(...args);
    this.localBuilder.order(...args);
    return this;
  }

  single(...args: any[]) {
    if (this.realBuilder) this.realBuilder = this.realBuilder.single(...args);
    this.localBuilder.single(...args);
    return this;
  }

  private async execute(): Promise<{ data: any; error: any }> {
    if (this.realBuilder) {
      try {
        const res = await this.realBuilder;
        if (res && res.error) {
          const errMsg = res.error.message || "";
          if (errMsg.includes("fetch failed") || res.error.code === "ENOTFOUND" || errMsg.includes("getaddrinfo")) {
            console.warn(`[SUPABASE FALLBACK] Connection failed, using local database for ${this.tableName}`);
            return await this.localBuilder;
          }
        }
        return res;
      } catch (err: any) {
        const errMsg = err.message || "";
        if (errMsg.includes("fetch failed") || err.code === "ENOTFOUND" || errMsg.includes("getaddrinfo")) {
          console.warn(`[SUPABASE FALLBACK] Connection threw fetch error, using local database for ${this.tableName}`);
          return await this.localBuilder;
        }
        return { data: null, error: err };
      }
    }
    return await this.localBuilder;
  }

  then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: { data: any; error: any }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected);
  }
}

const mockSupabase = {
  from(tableName: string) {
    const realBuilder = realSupabase ? realSupabase.from(tableName) : null;
    return new FluentWrapper(tableName, realBuilder);
  }
};

export default mockSupabase;
