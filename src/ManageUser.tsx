import React, { useEffect, useState } from "react";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  FormLabel,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  type FormErrors,
  type Course,
  ExtendedDatePickerProps,
  CourseProcess,
} from "./types/Course";
import { TextFieldProps } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

const MyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formValues, setFormValues] = useState<Course>({
    name: "",
    gender: "",
    company: "",
    email: "",
    phone: "",
    age: null,
    date: null,
    mixedDate: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (id) {
      (async function () {
        let { data } = await axios.get<Omit<Course, "date">>(
          `https://61fcdb8ff62e220017ce41c1.mockapi.io/courses/${id}`
        );
        setFormValues(new CourseProcess([data]).getCourse[0]);
      })();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormValues({
      ...formValues,
      date,
    });
  };

  const validate = (): boolean => {
    let tempErrors: FormErrors = {};

    if (!formValues.name) tempErrors.name = "Name is required";
    if (!formValues.gender) tempErrors.gender = "Gender is required";
    if (!formValues.company) tempErrors.company = "Company is required";
    if (!formValues.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formValues.email))
      tempErrors.email = "Email is not valid";
    if (!formValues.phone) tempErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formValues.phone))
      tempErrors.phone = "Phone number must be 10 digits";
    if (!formValues.age) tempErrors.age = "Age is required";
    else if (formValues.age < 18 || formValues.age > 100)
      tempErrors.age = "Age must be between 18 and 100";
    if (!formValues.date) {
      tempErrors.date = "Date is required";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      formValues.mixedDate = formValues.date?.getTime()!;
      let formData = {
        name: formValues.name,
        gender: formValues.gender,
        company: formValues.company,
        email: formValues.email,
        phone: formValues.phone,
        age: formValues.age,
        mixedDate: formValues.mixedDate,
      };
      if (id)
        await axios.put(
          `https://61fcdb8ff62e220017ce41c1.mockapi.io/courses/${id}`,
          formData
        );
      else
        await axios.post(
          "https://61fcdb8ff62e220017ce41c1.mockapi.io/courses",
          formData
        );
      navigate("/");
      // Proceed with form submission (e.g., send data to a server)
    }
  };

  const datePickerProps: ExtendedDatePickerProps = {
    renderInput: (params: TextFieldProps) => (
      <TextField
        {...params}
        fullWidth
        margin="normal"
        error={!!errors.date}
        helperText={errors.date}
      />
    ),
    inputFormat: "MM-dd-yyyy",
  };

  return (
    <Box
      pl={50}
      pr={50}
      display="flex"
      justifyContent="center"
      minHeight="100vh" // Ensures the Box takes up at least the full height of the viewport
    >
      <Box component={Paper} pl={20} pr={20}>
        <form onSubmit={handleSubmit}>
          <br />
          <Typography
            variant="h4" // Change the variant as needed (e.g., h3, h5, etc.)
            component="h2" // This determines the HTML element used (e.g., h1, h2)
            gutterBottom // Adds bottom margin to create space below the heading
            align="center" // Center aligns the text
            color="textPrimary" // Use color from the theme, you can also use custom colors
          >
            Manage User
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            margin="normal"
          />
          <FormControl
            component="fieldset"
            margin="normal"
            error={!!errors.gender}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formValues.gender}
              onChange={handleChange}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            {errors.gender && (
              <p style={{ color: "red", fontSize: "0.875rem" }}>
                {errors.gender}
              </p>
            )}
          </FormControl>
          <TextField
            label="Company"
            name="company"
            value={formValues.company}
            onChange={handleChange}
            error={!!errors.company}
            helperText={errors.company}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            type="number"
            value={formValues.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formValues.age}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
            fullWidth
            margin="normal"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={formValues.date}
              onChange={handleDateChange}
              {...datePickerProps}
            />
          </LocalizationProvider>
          {errors.date && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>{errors.date}</p>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px" }}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default MyForm;
