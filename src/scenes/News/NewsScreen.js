import React, { useState } from "react";
import classes from "./NewsScreen.module.scss";
import { useEffect } from "react";
import { getNews } from "./API/api";
import { useParams } from "react-router-dom";
const NewsScreen = (props) => {
  const [news, setNews] = useState({});
  let { id } = useParams();

  useEffect(() => {
    getNews(id).then((item) => {
      setNews(item.data.news[0]);
    });
  }, [id]);

  return (
    <div>
      <div class={classes.mainText}>{news.title}</div>
      <div
        className={classes.pageData}
        dangerouslySetInnerHTML={{ __html: news.pageData }}
      />
    </div>
  );
};

export default NewsScreen;
