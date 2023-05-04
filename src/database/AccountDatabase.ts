import { TAccountDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { Response } from 'express';

export class AccountDatabase extends BaseDatabase {

    public static TABLE_NAME = "accounts"

    public async getAllAccounts(): Promise<TAccountDB[]>{
        const accountsDB: TAccountDB[] = await BaseDatabase.connection(AccountDatabase.TABLE_NAME)
        return accountsDB
    }

    public async findAccountById(id:string, res: Response): Promise<TAccountDB>{
        const [accountDB]: TAccountDB[] = await BaseDatabase.connection(AccountDatabase.TABLE_NAME).where({ id })
        if (!accountDB) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }
        return accountDB
    }

    public async existAccountById(id:string, res: Response): Promise<TAccountDB>{
        const [accountDB]: TAccountDB[] = await BaseDatabase.connection(AccountDatabase.TABLE_NAME).where({ id })
        if (accountDB) {
            res.status(400)
            throw new Error("'id' já existe")
        }
        return accountDB
    }

    public async insertAccount(newAccountDB: TAccountDB): Promise<void> {
        await BaseDatabase.connection(AccountDatabase.TABLE_NAME).insert(newAccountDB)
    }

    public async updateBalanceAccount(newBalance: number, id: string): Promise<void>{
        await BaseDatabase.connection(AccountDatabase.TABLE_NAME).update({ balance: newBalance }).where({ id })
    }
}

