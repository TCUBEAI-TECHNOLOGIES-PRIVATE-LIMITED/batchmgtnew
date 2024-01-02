/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BatchCreateFormInputValues = {
    cpyName?: string;
    address?: string;
    link?: string;
    batchNumber?: string;
    productName?: string;
    mfgDate?: string;
    expiryDate?: string;
    mrp?: string;
    quantity?: string;
    value?: string;
    measure?: string;
    usp?: string;
};
export declare type BatchCreateFormValidationValues = {
    cpyName?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    link?: ValidationFunction<string>;
    batchNumber?: ValidationFunction<string>;
    productName?: ValidationFunction<string>;
    mfgDate?: ValidationFunction<string>;
    expiryDate?: ValidationFunction<string>;
    mrp?: ValidationFunction<string>;
    quantity?: ValidationFunction<string>;
    value?: ValidationFunction<string>;
    measure?: ValidationFunction<string>;
    usp?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BatchCreateFormOverridesProps = {
    BatchCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cpyName?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    link?: PrimitiveOverrideProps<TextFieldProps>;
    batchNumber?: PrimitiveOverrideProps<TextFieldProps>;
    productName?: PrimitiveOverrideProps<TextFieldProps>;
    mfgDate?: PrimitiveOverrideProps<TextFieldProps>;
    expiryDate?: PrimitiveOverrideProps<TextFieldProps>;
    mrp?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    value?: PrimitiveOverrideProps<TextFieldProps>;
    measure?: PrimitiveOverrideProps<TextFieldProps>;
    usp?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BatchCreateFormProps = React.PropsWithChildren<{
    overrides?: BatchCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BatchCreateFormInputValues) => BatchCreateFormInputValues;
    onSuccess?: (fields: BatchCreateFormInputValues) => void;
    onError?: (fields: BatchCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BatchCreateFormInputValues) => BatchCreateFormInputValues;
    onValidate?: BatchCreateFormValidationValues;
} & React.CSSProperties>;
export default function BatchCreateForm(props: BatchCreateFormProps): React.ReactElement;
