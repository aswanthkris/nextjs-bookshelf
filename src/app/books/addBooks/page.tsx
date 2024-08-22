"use client";
import AWS from "aws-sdk";
import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Typography,
  Box,
  Paper,
  InputLabel,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Page.module.css";
import { log } from "console";
import axiosInstance from "lib/Instances";
import { addNewBookApi } from "api/bookApis/[...bookApis]";
import { useToast } from "../../../components/ToastProvider/ToastProvider";
// Initialize the S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});
const genres = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Biography",
  "Mystery",
  "Fantasy",
  "Romance",
  "Thriller",
  "Horror",
  "History",
  "Other",
];

const validationSchema = Yup.object({
  bookName: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  author: Yup.string()
    .required("Author is required")
    .min(3, "Author must be at least 3 characters long"),
  genre: Yup.string().required("Genre is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be a positive number"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed()
    .required("Please choose an image file of .jpg/.png format")
    .test("fileSize", "File too large", (value) => {
      if (!value) return true; // If no file is selected, validation passes.
      return (value as File).size <= 2 * 1024 * 1024; // Cast value to File to access size.
    }) // 2MB file size limit
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true; // If no file is selected, validation passes.
      return ["image/jpeg", "image/png"].includes((value as File).type); // Cast value to File to access type.
    }),
});
const AddBooks: React.FC = () => {
  const { showToast } = useToast();
  //API CALL FUNCTIONS>>>
  const [addBookLoading, setAddBookLoading] = useState(false);
  const addBookApi = async (payload: object) => {
    try {
      setAddBookLoading(true);
      const response = await addNewBookApi(payload);
      // console.log("response", response);
      if ((response as any)?.status === 200) {
        showToast("Added Successfully", "success");
        formik.resetForm();
      } else {
        showToast("Adding failed!", "error");
      }
      setAddBookLoading(false);
    } catch (error) {
      setAddBookLoading(false);
      console.log("error", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      bookName: "",
      author: "",
      genre: "",
      price: "",
      language: "",
      description: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
        console.log("bucketName", bucketName);
        if (!bucketName) {
          throw new Error(
            "Bucket name is not defined in environment variables."
          );
        }

        if (values.image) {
          // Prepare the image for upload
          const file = values.image as File;
          const params = {
            Bucket: bucketName, // your bucket name
            Key: `images/${file.name}`, // where the file will be saved in the bucket
            Body: file,
            ContentType: file.type,
          };

          // Upload the image to S3
          try {
            const uploadResult = await s3.upload(params).promise();

            // store the S3 URL in your database or form data
            const imageUrl = uploadResult.Location;
            console.log("Image URL:", imageUrl);
            console.log("Book Details:", values);
            const payload = { ...values, image: imageUrl };
            addBookApi(payload);
          } catch (error) {
            console.log("S3 error", error);
            return error;
          }
        }

        // Handle the form submission logic here, e.g., send formData to your backend API.
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
  });
  return (
    <Container maxWidth="sm" className={styles.container}>
      <Paper elevation={3} className={styles.paper}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          className={styles.header}
        >
          Add a Pre-Owned Book
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Title"
              name="bookName"
              value={formik.values.bookName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.bookName && Boolean(formik.errors.bookName)}
              helperText={formik.touched.bookName && formik.errors.bookName}
              className={styles.textField}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
              className={styles.textField}
            />
          </Box>
          <Box mb={2}>
            <TextField
              select
              fullWidth
              label="Genre"
              name="genre"
              value={formik.values.genre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.genre && Boolean(formik.errors.genre)}
              helperText={formik.touched.genre && formik.errors.genre}
              className={styles.textField}
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Language"
              name="language"
              value={formik.values.language}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.language && Boolean(formik.errors.language)}
              helperText={formik.touched.language && formik.errors.language}
              className={styles.textField}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              className={styles.textField}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              multiline
              rows={4}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              className={styles.textField}
            />
          </Box>
          <Box mb={2}>
            <InputLabel shrink className={styles.textField}>
              Upload Image
            </InputLabel>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/png"
              onChange={(event) => {
                if (event.currentTarget.files && event.currentTarget.files[0]) {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }
              }}
              onBlur={formik.handleBlur}
              className={styles.uploadField}
            />
            {formik.touched.image && formik.errors.image ? (
              <div className={styles.errorText}>{formik.errors.image}</div>
            ) : null}
          </Box>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            className={styles.submitButton}
            loading={addBookLoading}
          >
            Add Book
          </LoadingButton>
        </form>
      </Paper>
    </Container>
  );
};

export default AddBooks;
