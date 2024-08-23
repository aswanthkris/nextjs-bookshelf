import axiosInstance from "lib/Instances";

const commonEndPoint = "api/books";

export const booksCommonPostRequest = async (
  apiEndPoint: string,
  payload: object
) => {
  const endPoint = commonEndPoint + apiEndPoint;
  const token = "dummyToken";
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axiosInstance.post(
      endPoint,
      payload,

      {
        headers,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    // handleCatchError(error);
    return error;
  }
};

export const booksCommonGetRequest = async (
  apiEndPoint: string,
  params: object
) => {
  const endPoint = commonEndPoint + apiEndPoint;
  const token = "dummyToken";
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axiosInstance.get(
      endPoint,

      {
        headers,
        params,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    // handleCatchError(error);
    return error;
  }
};

export const GET_API_ENDPOINTS = {
  fetchAllBooks: "/getAllBooks",
  fetchSingleBook: "/getSingleBook",
};
export const POST_API_ENDPOINTS = {
  addNewBook: "/addBook",
};

//API CALL FUNCTIONS STARTS HERE>>>>>>>>>>>>>>>>>...

//POST APIS
export const addNewBookApi = async (payload: object) => {
  //API FOR ADDING NEW BOOK
  const response = await booksCommonPostRequest(
    POST_API_ENDPOINTS.addNewBook,
    payload
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
  return response;
};

//GET APIS
export const fetchAllBooksApi = async (payload: object) => {
  //API FOR FETCHING ALL BOOKS DETAILS
  const response = await booksCommonGetRequest(
    GET_API_ENDPOINTS.fetchAllBooks,
    payload
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
  return response;
};

export const fetchOneBook = async (payload: object) => {
  //API FOR FETCHING ALL BOOKS DETAILS
  const response = await booksCommonGetRequest(
    GET_API_ENDPOINTS.fetchSingleBook,
    payload
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
  return response;
};
