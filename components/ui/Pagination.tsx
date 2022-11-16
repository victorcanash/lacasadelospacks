import PaginationMUI from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type PaginationProps = {
  totalPages: number,
  currentPage: number,
  onChangePage: (event: React.ChangeEvent<unknown>, page: number) => void,
}

const Pagination = (props: PaginationProps) => {
  const {
    totalPages,
    currentPage,
    onChangePage,
  } = props;

  return (
    <Stack spacing={2} sx={{ mt: 1 }} >
      <PaginationMUI
        sx={{
          display: "flex", flexDirection: "col", justifyContent: "center"
        }}
        count={totalPages}
        page={currentPage}
        onChange={onChangePage}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};

export default Pagination;