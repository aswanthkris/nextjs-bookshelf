"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import BookCard from "../../../components/BookCard/BookCard";
import { Book } from "../../../types/Components/Books";
import { fetchAllBooksApi } from "api/bookApis/[...bookApis]";

const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  //API CALL FUNCTIONS
  const getCompleteBooksList = async () => {
    try {
      const payload = {};
      const response = await fetchAllBooksApi(payload);
      const booksList = (response as any)?.data;
      setBooks(booksList);
    } catch (error) {
      console.log(error);
    }
  };

  //useEffects
  useEffect(() => {
    getCompleteBooksList();
  }, []);
  return (
    <Container>
      <Grid container spacing={4}>
        {books?.map((book) => (
          <Grid item key={book?._id} xs={12} sm={6} md={2}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
