/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createBatch } from "../graphql/mutations";
const client = generateClient();
export default function BatchCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    cpyName: "",
    address: "",
    link: "",
    batchNumber: "",
    productName: "",
    mfgDate: "",
    expiryDate: "",
    mrp: "",
    quantity: "",
    value: "",
    measure: "",
    usp: "",
  };
  const [cpyName, setCpyName] = React.useState(initialValues.cpyName);
  const [address, setAddress] = React.useState(initialValues.address);
  const [link, setLink] = React.useState(initialValues.link);
  const [batchNumber, setBatchNumber] = React.useState(
    initialValues.batchNumber
  );
  const [productName, setProductName] = React.useState(
    initialValues.productName
  );
  const [mfgDate, setMfgDate] = React.useState(initialValues.mfgDate);
  const [expiryDate, setExpiryDate] = React.useState(initialValues.expiryDate);
  const [mrp, setMrp] = React.useState(initialValues.mrp);
  const [quantity, setQuantity] = React.useState(initialValues.quantity);
  const [value, setValue] = React.useState(initialValues.value);
  const [measure, setMeasure] = React.useState(initialValues.measure);
  const [usp, setUsp] = React.useState(initialValues.usp);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCpyName(initialValues.cpyName);
    setAddress(initialValues.address);
    setLink(initialValues.link);
    setBatchNumber(initialValues.batchNumber);
    setProductName(initialValues.productName);
    setMfgDate(initialValues.mfgDate);
    setExpiryDate(initialValues.expiryDate);
    setMrp(initialValues.mrp);
    setQuantity(initialValues.quantity);
    setValue(initialValues.value);
    setMeasure(initialValues.measure);
    setUsp(initialValues.usp);
    setErrors({});
  };
  const validations = {
    cpyName: [{ type: "Required" }],
    address: [{ type: "Required" }],
    link: [{ type: "Required" }],
    batchNumber: [{ type: "Required" }],
    productName: [{ type: "Required" }],
    mfgDate: [{ type: "Required" }],
    expiryDate: [{ type: "Required" }],
    mrp: [{ type: "Required" }],
    quantity: [{ type: "Required" }],
    value: [{ type: "Required" }],
    measure: [{ type: "Required" }],
    usp: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          cpyName,
          address,
          link,
          batchNumber,
          productName,
          mfgDate,
          expiryDate,
          mrp,
          quantity,
          value,
          measure,
          usp,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createBatch.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "BatchCreateForm")}
      {...rest}
    >
      <TextField
        label="Cpy name"
        isRequired={true}
        isReadOnly={false}
        value={cpyName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpyName: value,
              address,
              link,
              batchNumber,
              productName,
              mfgDate,
              expiryDate,
              mrp,
              quantity,
              value,
              measure,
              usp,
            };
            const result = onChange(modelFields);
            value = result?.cpyName ?? value;
          }
          if (errors.cpyName?.hasError) {
            runValidationTasks("cpyName", value);
          }
          setCpyName(value);
        }}
        onBlur={() => runValidationTasks("cpyName", cpyName)}
        errorMessage={errors.cpyName?.errorMessage}
        hasError={errors.cpyName?.hasError}
        {...getOverrideProps(overrides, "cpyName")}
      ></TextField>
      <TextField
        label="Address"
        isRequired={true}
        isReadOnly={false}
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpyName,
              address: value,
              link,
              batchNumber,
              productName,
              mfgDate,
              expiryDate,
              mrp,
              quantity,
              value,
              measure,
              usp,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
        {...getOverrideProps(overrides, "address")}
      ></TextField>
      <TextField
        label="Link"
        isRequired={true}
        isReadOnly={false}
        value={link}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpyName,
              address,
              link: value,
              batchNumber,
              productName,
              mfgDate,
              expiryDate,
              mrp,
              quantity,
              value,
              measure,
              usp,
            };
            const result = onChange(modelFields);
            value = result?.link ?? value;
          }
          if (errors.link?.hasError) {
            runValidationTasks("link", value);
          }
          setLink(value);
        }}
        onBlur={() => runValidationTasks("link", link)}
        errorMessage={errors.link?.errorMessage}
        hasError={errors.link?.hasError}
        {...getOverrideProps(overrides, "link")}
      ></TextField>
      <TextField
        label="Batch number"
        isRequired={true}
        isReadOnly={false}
        value={batchNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpyName,
              address,
              link,
              batchNumber: value,
              productName,
              mfgDate,
              expiryDate,
              mrp,
              quantity,
              value,
              measure,
              usp,
            };
            const result = onChange(modelFields);
            value = result?.batchNumber ?? value;
          }
          if (errors.batchNumber?.hasError) {
            runValidationTasks("batchNumber", value);
          }
          setBatchNumber(value);
        }}
        onBlur={() => runValidationTasks("batchNumber", batchNumber)}
        errorMessage={errors.batchNumber?.errorMessage}
        hasError={errors.batchNumber?.hasError}
        {...getOverrideProps(overrides, "batchNumber")}
      ></TextField>
      <TextField
        label="Product name"
        isRequired={true}
        isReadOnly={false}
        value={productName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpyName,
              address,
              link,
              batchNumber,
              productName: value,
              mfgDate,
              expiryDate,
              mrp,
              quantity,
              value,
              measure,
              usp,
            };
            const result = onChange(modelFields);
            value = result?.productName ?? value;
          }
          if (errors.productName?.hasError) {
            runValidationTasks("productName", value);
          }
          setProductName(value);
        }}
        onBlur={() => runValidationTasks("productName", productName)}
        errorMessage={errors.productName?.errorMessage}
        hasError={errors.productName?.hasError}
        {...getOverrideProps(overrides, "productName")}
      ></TextField>
      <TextField
        label="Mfg date"
        isRequired={true}
        isReadOnly={false}
        value={mfgDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpyName,
              address,
              link,
              batchNumber,
              productName,
              mfgDate: value,
              expiryDate,
              mrp,
              quantity,
              value,
              measure,
              usp,
            };
            const result = onChange(modelFields);
            value = result?.mfgDate ?? value;
          }
          if (errors.mfgDate?.hasError) {
            runValidationTasks("mfgDate", value);
          }
          setMfgDate(value);
        }}
        onBlur={() => runValidationTasks("mfgDate", mfgDate)}
        errorMessage={errors.mfgDate?.errorMessage}
        hasError={errors.mfgDate?.hasError}
        {...getOverrideProps(overrides, "mfgDate")}
      ></TextField>
      <TextField
        label="Expiry date"
        isRequired={true}
        isReadOnly={false}
        value={expiryDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpyName,
              address,
              link,
              batchNumber,
              productName,
              mfgDate,
              expiryDate: value,
              mrp,
              quantity,
              value,
              measure,
              usp,
            };
            const result = onChange(modelFields);
            value = result?.expiryDate ?? value;
          }
          if (errors.expiryDate?.hasError) {
            runValidationTasks("expiryDate", value);
          }
          setExpiryDate(value);
        }}
        onBlur={() => runValidationTasks("expiryDate", expiryDate)}
        errorMessage={errors.expiryDate?.errorMessage}
        hasError={errors.expiryDate?.hasError}
        {...getOverrideProps(overrides, "expiryDate")}
      ></TextField>
      <TextField
        label="Mrp"
        isRequired={true}
        isReadOnly={false}
        value={mrp}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpyName,
              address,
              link,
              batchNumber,
              productName,
              mfgDate,
              expiryDate,
              mrp: value,
              quantity,
              value,
              measure,
              usp,
            };
            const result = onChange(modelFields);
            value = result?.mrp ?? value;
          }
          if (errors.mrp?.hasError) {
            runValidationTasks("mrp", value);
          }
          setMrp(value);
        }}
        onBlur={() => runValidationTasks("mrp", mrp)}
        errorMessage={errors.mrp?.errorMessage}
        hasError={errors.mrp?.hasError}
        {...getOverrideProps(overrides, "mrp")}
      ></TextField>
      <TextField
        label="Quantity"
        isRequired={true}
        isReadOnly={false}
        value={quantity}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpyName,
              address,
              link,
              batchNumber,
              productName,
              mfgDate,
              expiryDate,
              mrp,
              quantity: value,
              value,
              measure,
              usp,
            };
            const result = onChange(modelFields);
            value = result?.quantity ?? value;
          }
          if (errors.quantity?.hasError) {
            runValidationTasks("quantity", value);
          }
          setQuantity(value);
        }}
        onBlur={() => runValidationTasks("quantity", quantity)}
        errorMessage={errors.quantity?.errorMessage}
        hasError={errors.quantity?.hasError}
        {...getOverrideProps(overrides, "quantity")}
      ></TextField>
      <TextField
        label="Value"
        isRequired={true}
        isReadOnly={false}
        value={value}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpyName,
              address,
              link,
              batchNumber,
              productName,
              mfgDate,
              expiryDate,
              mrp,
              quantity,
              value: value,
              measure,
              usp,
            };
            const result = onChange(modelFields);
            value = result?.value ?? value;
          }
          if (errors.value?.hasError) {
            runValidationTasks("value", value);
          }
          setValue(value);
        }}
        onBlur={() => runValidationTasks("value", value)}
        errorMessage={errors.value?.errorMessage}
        hasError={errors.value?.hasError}
        {...getOverrideProps(overrides, "value")}
      ></TextField>
      <TextField
        label="Measure"
        isRequired={true}
        isReadOnly={false}
        value={measure}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpyName,
              address,
              link,
              batchNumber,
              productName,
              mfgDate,
              expiryDate,
              mrp,
              quantity,
              value,
              measure: value,
              usp,
            };
            const result = onChange(modelFields);
            value = result?.measure ?? value;
          }
          if (errors.measure?.hasError) {
            runValidationTasks("measure", value);
          }
          setMeasure(value);
        }}
        onBlur={() => runValidationTasks("measure", measure)}
        errorMessage={errors.measure?.errorMessage}
        hasError={errors.measure?.hasError}
        {...getOverrideProps(overrides, "measure")}
      ></TextField>
      <TextField
        label="Usp"
        isRequired={true}
        isReadOnly={false}
        value={usp}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpyName,
              address,
              link,
              batchNumber,
              productName,
              mfgDate,
              expiryDate,
              mrp,
              quantity,
              value,
              measure,
              usp: value,
            };
            const result = onChange(modelFields);
            value = result?.usp ?? value;
          }
          if (errors.usp?.hasError) {
            runValidationTasks("usp", value);
          }
          setUsp(value);
        }}
        onBlur={() => runValidationTasks("usp", usp)}
        errorMessage={errors.usp?.errorMessage}
        hasError={errors.usp?.hasError}
        {...getOverrideProps(overrides, "usp")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
