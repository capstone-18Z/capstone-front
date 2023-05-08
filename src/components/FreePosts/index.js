import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button, Alert, CircularProgress, Pagination } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import useApiCall from "../../hooks/useApiCall";
import useInput from "../../hooks/useInput";
import {useState, useEffect} from "react";
import axios from "axios";

function FreePosts() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTitle, setSearchTitle] = useInput({
    title: "",
  });
  const [page_number, setPage_number] = useState(searchParams.get("page"));
  const [pageCount, setPageCount] = useState(1);
  const [loading, payload, error, fetchData] = useApiCall(
    `${process.env.REACT_APP_API_URL}/member/post?page=${page_number}`
  );
  const [freePosts, setFreePosts] = useState([]);

  useEffect(() => {
    if (payload) {
      setPage_number(searchParams.get("page"));
      setFreePosts(payload?.data || []);
      setPageCount(payload.state);
    }
  }, [searchParams, payload]);

  if (loading || !payload) {
    return (
      <>
        <CircularProgress color="inherit" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Alert severity="error">{error}</Alert>
      </>
    );
  }

  const searchFreePost = async () => {
    if (!searchTitle.title) {
      window.location.reload(); // 페이지 새로고침
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/post/search/${searchTitle.title}`
      );
      console.log(response);
      setSearchParams({ page: 1 }); // 검색 결과 페이징 초기화
      setPageCount(1);
      if (response.data === null) {
        setFreePosts([]);
      } else {
        setFreePosts(response.data); // 검색 결과로 payload 상태 설정
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event) => {
    const key = event.code;
    switch (key) {
      case "Enter":
        searchTitle();
        break;
      default:
    }
  };

  console.log(payload)

  return (
    <div>
      <div className="contest_search">
        <p className="contest_search_title">게시물 검색</p>
        <div className="search-form">
          <input
            type="text"
            placeholder={searchTitle.title === "" ? "제목으로 검색해보세요. " : searchTitle}
            className="search_bar"
            name="title"
            value={searchTitle.title}
            onChange={setSearchTitle}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button" onClick={searchFreePost}>
            <FaSearch />
          </button>
        </div>
      </div>
      <div>
        <Button
          variant="text"
          onClick={(e) => {
            navigate("/post/freepost");
          }}
        >
          게시물 작성
        </Button>
      </div>
      <div className="post-card-container">
        {Array.isArray(freePosts) && freePosts.length > 0 ? (
          freePosts.map((post) => (
            <motion.div
              initial={{ opacity: 0.2 }}
              whileInView={{
                opacity: 1,
                transition: { delay: 0.1 },
              }}
              whileHover={{
                scale: 1.12,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              key={post.id}
            >
              <div>
                <postCard payload={post} fetchData={fetchData} />
              </div>
            </motion.div>
          ))
        ) : freePosts && Object.keys(freePosts).length > 0 ? (
          <motion.div
            initial={{ opacity: 0.2 }}
            whileInView={{
              opacity: 1,
              transition: { delay: 0.1 },
            }}
            whileHover={{
              scale: 1.12,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            key={freePosts.id}
          >
            <div>
              <postCard payload={freePosts} fetchData={fetchData} />
            </div>
          </motion.div>
        ) : (
          <Alert severity="info">검색결과 0 건</Alert>
        )}
      </div>
      <Pagination
        sx={{ display: "flex", justifyContent: "center", margin: "30px" }}
        page={Number(searchParams.get("page"))}
        count={pageCount}
        size="large"
        onChange={(e, value) => {
          navigate(`?page=${value}`);
        }}
      />
    </div>
  );
}

export default FreePosts;
