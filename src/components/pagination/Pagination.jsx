import { Button } from "@mui/joy";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          variant={currentPage === i ? "solid" : "soft"}
          size="sm"
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination ">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outlined"
        size="sm"
      >
        ◀
      </Button>

      {renderPageNumbers()}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outlined"
        size="sm"
      >
        ▶
      </Button>
    </div>
  );
};

export default Pagination;
