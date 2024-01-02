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
import { createProduct } from "../graphql/mutations";
const client = generateClient();
export default function ProductCreateForm(props) {
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
    name: "",
    mrp: "",
    volume: "",
    measure: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [mrp, setMrp] = React.useState(initialValues.mrp);
  const [volume, setVolume] = React.useState(initialValues.volume);
  const [measure, setMeasure] = React.useState(initialValues.measure);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setMrp(initialValues.mrp);
    setVolume(initialValues.volume);
    setMeasure(initialValues.measure);
    setErrors({});
  };
  const validations = {
    name: [],
    mrp: [],
    volume: [],
    measure: [],
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
          name,
          mrp,
          volume,
          measure,
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
            query: createProduct.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "ProductCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              mrp,
              volume,
              measure,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Mrp"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={mrp}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              mrp: value,
              volume,
              measure,
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
        label="Volume"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={volume}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              mrp,
              volume: value,
              measure,
            };
            const result = onChange(modelFields);
            value = result?.volume ?? value;
          }
          if (errors.volume?.hasError) {
            runValidationTasks("volume", value);
          }
          setVolume(value);
        }}
        onBlur={() => runValidationTasks("volume", volume)}
        errorMessage={errors.volume?.errorMessage}
        hasError={errors.volume?.hasError}
        {...getOverrideProps(overrides, "volume")}
      ></TextField>
      <TextField
        label="Measure"
        isRequired={false}
        isReadOnly={false}
        value={measure}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              mrp,
              volume,
              measure: value,
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
