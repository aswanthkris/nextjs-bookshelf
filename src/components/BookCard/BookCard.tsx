import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import { Book } from "../../types/Components/Books";
import styles from "./Bookcard.module.css";
import Link from "next/link";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Card className={styles.card}>
      <img className={styles.media} src={book.image} alt={book.bookName} />
      <CardContent className={styles.content}>
        <Tooltip title={book.bookName} arrow>
          <Typography className={styles.title} variant="h5" component="div">
            {book?.bookName}
          </Typography>
        </Tooltip>
        <Tooltip title={book.author} arrow>
          <Typography className={styles.author} variant="body2">
            {book.author}
          </Typography>
        </Tooltip>
        <Typography className={styles.price} variant="body2">
          ₹ {book.price}
        </Typography>
      </CardContent>
      <CardActions className={styles.actions}>
        <Tooltip title={book.description} arrow>
          <IconButton size="small">
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Button
          // onClick={handleBuyClick}
          size="small"
          variant="contained"
          color="error"
        >
          <Link href={`/books/bookDetails?id=${book?._id}`}> Buy Now</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
