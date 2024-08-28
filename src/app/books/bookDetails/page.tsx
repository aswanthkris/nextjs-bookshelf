"use client";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchOneBook } from "api/bookApis/[...bookApis]";
import { BookResponse, Book } from "../../../types/Components/Books";
const BookDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [book, setBook] = useState<Book | null>(null);
  //HANDLER FUNCTIONS
  const fetchSingleBook = async (id: string) => {
    const payload = { id };
    const response = (await fetchOneBook(payload)) as BookResponse;
    if (response.data) {
      const bookData = response.data;
      setBook(bookData);
    }
  };
  useEffect(() => {
    if (id) {
      fetchSingleBook(id);
    }
  }, [id]);
  return (
    <Card className={styles.root}>
      <CardMedia
        className={styles.media}
        image={book ? book.image : ""}
        title={book ? book.bookName : undefined}
      />
      <CardContent className={styles.content}>
        <Typography variant="h4" gutterBottom>
          {book && book.bookName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          By {book && book.author}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {book && book.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Language: {book && book.language}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Price: ₹ {book && book.price}
        </Typography>
        <Button variant="contained" color="error" className={styles.buyButton}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookDetails;
