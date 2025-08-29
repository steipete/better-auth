import { a as Adapter, B as BetterAuthOptions, G as GenericEndpointContext, J as Where, F as FieldAttribute, a5 as FieldType, K as KyselyDatabaseType } from '../shared/better-auth.IGoBAHaT.cjs';
export { aj as BetterAuthDbSchema, a8 as FieldAttributeConfig, ae as FieldAttributeToObject, af as InferAdditionalFieldsFromPluginOptions, ai as InferFieldsFromOptions, ah as InferFieldsFromPlugins, ac as InferFieldsInput, ad as InferFieldsInputClient, ab as InferFieldsOutput, aa as InferValueType, a7 as InternalAdapter, ag as PluginFieldAttribute, al as accountSchema, a9 as createFieldAttribute, a6 as createInternalAdapter, aq as getAllFields, ak as getAuthTables, az as mergeSchema, ax as parseAccountInput, as as parseAccountOutput, aw as parseAdditionalUserInput, au as parseInputData, ap as parseOutputData, ay as parseSessionInput, at as parseSessionOutput, av as parseUserInput, ar as parseUserOutput, an as sessionSchema, am as userSchema, ao as verificationSchema } from '../shared/better-auth.IGoBAHaT.cjs';
import * as z from 'zod/v4';
import 'kysely';
import 'better-call';
import '../shared/better-auth.D9UKno48.cjs';
import '../shared/better-auth.DcPaQ6CM.cjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

declare function getWithHooks(adapter: Adapter, ctx: {
    options: BetterAuthOptions;
    hooks: Exclude<BetterAuthOptions["databaseHooks"], undefined>[];
}): {
    createWithHooks: <T extends Record<string, any>>(data: T, model: "user" | "account" | "session" | "verification", customCreateFn?: {
        fn: (data: Record<string, any>) => void | Promise<any>;
        executeMainFn?: boolean;
    }, context?: GenericEndpointContext) => Promise<any>;
    updateWithHooks: <T extends Record<string, any>>(data: any, where: Where[], model: "user" | "account" | "session" | "verification", customUpdateFn?: {
        fn: (data: Record<string, any>) => void | Promise<any>;
        executeMainFn?: boolean;
    }, context?: GenericEndpointContext) => Promise<any>;
    updateManyWithHooks: <T extends Record<string, any>>(data: any, where: Where[], model: "user" | "account" | "session" | "verification", customUpdateFn?: {
        fn: (data: Record<string, any>) => void | Promise<any>;
        executeMainFn?: boolean;
    }, context?: GenericEndpointContext) => Promise<any>;
};

declare function toZodSchema<Fields extends Record<string, FieldAttribute | never>, IsClientSide extends boolean>({ fields, isClientSide, }: {
    fields: Fields;
    /**
     * If true, then any fields that have `input: false` will be removed from the schema to prevent user input.
     */
    isClientSide: IsClientSide;
}): z.ZodObject<RemoveNeverProps<{ [key in keyof Fields]: FieldAttributeToSchema<Fields[key], IsClientSide>; }>, z.core.$strip>;
type FieldAttributeToSchema<Field extends FieldAttribute | Record<string, never>, isClientSide extends boolean = false> = Field extends {
    type: any;
} ? GetInput<isClientSide, Field, GetRequired<Field, GetType<Field>>> : Record<string, never>;
type GetType<F extends FieldAttribute> = F extends {
    type: "string";
} ? z.ZodString : F extends {
    type: "number";
} ? z.ZodNumber : F extends {
    type: "boolean";
} ? z.ZodBoolean : F extends {
    type: "date";
} ? z.ZodDate : z.ZodAny;
type GetRequired<F extends FieldAttribute, Schema extends z.core.SomeType> = F extends {
    required: true;
} ? Schema : z.ZodOptional<Schema>;
type GetInput<isClientSide extends boolean, Field extends FieldAttribute, Schema extends z.core.SomeType> = Field extends {
    input: false;
} ? isClientSide extends true ? never : Schema : Schema;
type RemoveNeverProps<T> = {
    [K in keyof T as [T[K]] extends [never] ? never : K]: T[K];
};

declare function getAdapter(options: BetterAuthOptions): Promise<Adapter>;
declare function convertToDB<T extends Record<string, any>>(fields: Record<string, FieldAttribute>, values: T): T;
declare function convertFromDB<T extends Record<string, any>>(fields: Record<string, FieldAttribute>, values: T | null): T | null;

declare function matchType(columnDataType: string, fieldType: FieldType, dbType: KyselyDatabaseType): boolean;
declare function getMigrations(config: BetterAuthOptions): Promise<{
    toBeCreated: {
        table: string;
        fields: Record<string, FieldAttribute>;
        order: number;
    }[];
    toBeAdded: {
        table: string;
        fields: Record<string, FieldAttribute>;
        order: number;
    }[];
    runMigrations: () => Promise<void>;
    compileMigrations: () => Promise<string>;
}>;

declare function getSchema(config: BetterAuthOptions): Record<string, {
    fields: Record<string, FieldAttribute>;
    order: number;
}>;

export { FieldAttribute, FieldType, convertFromDB, convertToDB, getAdapter, getMigrations, getSchema, getWithHooks, matchType, toZodSchema };
export type { FieldAttributeToSchema };
