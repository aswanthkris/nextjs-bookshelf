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

const BookDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log("id", id);
  const [book, setBook] = useState();

  // useEffect(() => {}, []);
  return (
    // <Card className={styles.root}>
    //   <CardMedia
    //     className={styles.media}
    //     image={book.imageUrl}
    //     title={book.title}
    //   />
    //   <CardContent className={styles.content}>
    //     <Typography variant="h4" gutterBottom>
    //       {book.title}
    //     </Typography>
    //     <Typography variant="h6" gutterBottom>
    //       By {book.author}
    //     </Typography>
    //     <Typography variant="body1" gutterBottom>
    //       {book.description}
    //     </Typography>
    //     <Typography variant="body1" gutterBottom>
    //       Language: {book.language}
    //     </Typography>
    //     <Typography variant="h5" gutterBottom>
    //       Price: ${book.price}
    //     </Typography>
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       className={styles.buyButton}
    //     >
    //       Add to Cart
    //     </Button>
    //   </CardContent>
    // </Card>
    <h1>hueirh</h1>
  );
};

export default BookDetails;
