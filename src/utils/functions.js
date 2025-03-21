const convertDate = date => {
  return new Date(date._seconds * 1000 + date._nanoseconds / 1000000);
};

export {convertDate};
