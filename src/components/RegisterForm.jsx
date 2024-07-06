import { useState } from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { FormProvider } from "react-hook-form";

const steps = ["Step 1", "Step 2", "Step 3"];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: false,
  });

  const [errors, setErrors] = useState({
    emailId: "",
    password: "",
    firstName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStepClick = (step) => () => {
    // Only allow navigation if the target step is less than or equal to the current step
    // and all previous steps are valid
    if (step <= activeStep && validateStep(step)) {
      setActiveStep(step);
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = () => {
    console.log("Form data saved:", formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep === steps.length - 1) {
      if (validateStep()) {
        const data = { ...formData };
        delete data.acceptTermsAndCondition;
        fetch("https://codebuddy.review/submit", {
          body: JSON.stringify(data),
          method: "POST",
        })
          .then((response) => response.json())
          .then((data) => console.log("Success:", data))
          .catch((error) => console.error("Error:", error));
      }
    } else {
      handleNext();
    }
  };

  const validateStep = (step = activeStep) => {
    const currentStepData = formData;
    let valid = true;
    let stepErrors = { ...errors };

    switch (step) {
      case 0:
        if (!currentStepData.emailId) {
          stepErrors.emailId = "Email is required";
          valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentStepData.emailId)) {
          stepErrors.emailId = "Invalid email address";
          valid = false;
        } else {
          stepErrors.emailId = "";
        }

        if (!currentStepData.password) {
          stepErrors.password = "Password is required";
          valid = false;
        } else if (
          !/^(?=.*[A-Z]{2})(?=.*[a-z]{2})(?=.*\d{2})(?=.*[!@#$%^&*]{2}).{8,}$/.test(
            currentStepData.password,
          )
        ) {
          stepErrors.password =
            "Password must contain 2 uppercase, 2 lowercase, 2 numbers, and 2 special characters";
          valid = false;
        } else {
          stepErrors.password = "";
        }
        break;
      case 1:
        if (!currentStepData.firstName) {
          stepErrors.firstName = "First Name is required";
          valid = false;
        } else if (!/^[A-Za-z]{2,50}$/.test(currentStepData.firstName)) {
          stepErrors.firstName = "First name must be between 2 and 50 alphabetic characters";
          valid = false;
        } else {
          stepErrors.firstName = "";
        }

        if (!currentStepData.address) {
          stepErrors.address = "Address is required";
          valid = false;
        } else if (currentStepData.address.length < 10) {
          stepErrors.address = "Address must be at least 10 characters long";
          valid = false;
        } else {
          stepErrors.address = "";
        }
        break;
      case 2:
        if (!currentStepData.countryCode) {
          stepErrors.countryCode = "Country Code is required";
          valid = false;
        } else {
          stepErrors.countryCode = "";
        }

        if (!currentStepData.phoneNumber) {
          stepErrors.phoneNumber = "Phone Number is required";
          valid = false;
        } else if (!/^\d{10}$/.test(currentStepData.phoneNumber)) {
          stepErrors.phoneNumber = "Phone number must be 10 digits";
          valid = false;
        } else {
          stepErrors.phoneNumber = "";
        }

        if (!currentStepData.acceptTermsAndCondition) {
          stepErrors.acceptTermsAndCondition = "You must accept the terms and conditions";
          valid = false;
        } else {
          stepErrors.acceptTermsAndCondition = "";
        }
        break;
      default:
        break;
    }

    setErrors(stepErrors);
    return valid;
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              label="Email ID"
              type="text"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.emailId}
              helperText={errors.emailId}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.password}
              helperText={errors.password}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.address}
              helperText={errors.address}
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField
              label="Country Code"
              select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.countryCode}
              helperText={errors.countryCode}
            >
              <MenuItem value="+91">India (+91)</MenuItem>
              <MenuItem value="+1">America (+1)</MenuItem>
            </TextField>
            <TextField
              label="Phone Number"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="acceptTermsAndCondition"
                  checked={formData.acceptTermsAndCondition}
                  onChange={handleChange}
                />
              }
              label="I accept the terms and conditions"
              margin="normal"
              required
              error={!!errors.acceptTermsAndCondition}
              helperText={errors.acceptTermsAndCondition}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel className="cursor-pointer" onClick={handleStepClick(index)}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit}>
        <FormProvider>
          {renderStepContent(activeStep)}
          <Box mt={2} className="flex gap-2">
            <Button disabled={activeStep === 0} onClick={handleBack} variant="contained">
              Back
            </Button>
            <Button onClick={() => handleSave()} variant="contained">
              Save
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {activeStep === steps.length - 1 ? "Submit" : "Save and Next"}
            </Button>
          </Box>
        </FormProvider>
      </form>
    </Box>
  );
};

export default MultiStepForm;
