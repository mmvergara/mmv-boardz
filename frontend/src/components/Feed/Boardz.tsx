import Container from "@mui/material/Container";
import BoardzItems from "./BoardzItems";
import uniqid from "uniqid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import BoardzFallback from "./sub-components/BoardzFallback";
import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { BoardzInfoFeed } from "../types/BoardzTypes";
import { getBoardz, getBoardzCount } from "../../api/BoardController";
import { CrownTheme } from "../Style/Theme";
import { useSearchParams } from "react-router-dom";
import { BOARDZ_ITEM_PERPAGE_COUNT } from "../../Config";

const BoardzIndex: React.FC = () => {
  const [boardList, setBoardList] = useState<BoardzInfoFeed[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const defaultPage = Number(searchParams.get("page")) || 1;
  const isMobile = !useMediaQuery("(min-width:715px)");

  const [page, setPage] = useState(defaultPage);
  const [pageCount, setPageCount] = useState<number>(0);
  const handlePageChange = (event: any, value: number) => {
    setPage(value);
    window.history.replaceState(null, "", `?page=${value}`);
  };

  const fetchBoardCount = async () => {
    const result = await getBoardzCount();
    if (result.ok) setPageCount(Math.ceil(result.count / BOARDZ_ITEM_PERPAGE_COUNT) || 0);
  };

  useEffect(() => {
    const fetchBoardList = async () => {
      setIsLoading(true);
      const result = await getBoardz(page);
      if (!result?.ok) return [];
      setBoardList(result.boardzList);
      setIsLoading(false);
    };
    fetchBoardList();
    fetchBoardCount();
  }, [page]);

  return (
    <ThemeProvider theme={CrownTheme}>
      <article style={{ marginTop: "80px" }}>
        <Container maxWidth='md'>
          {isLoading && <BoardzFallback />}
          {boardList.length === 0 && !isLoading && (
            <h1 style={{ textAlign: "center" }}>Wow it's empty 😲</h1>
          )}
          {boardList.map((x) => {
            return <BoardzItems key={uniqid(x.boardTitle)} boardDetails={x} />;
          })}
          <Stack spacing={1} sx={{ display: "flex", alignItems: "center", marginBottom: "4em" }}>
            <Pagination
              color='standard'
              size={isMobile ? "small" : "large"}
              count={pageCount}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
        </Container>
      </article>
    </ThemeProvider>
  );
};

export default BoardzIndex;
