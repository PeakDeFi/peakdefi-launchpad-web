import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { BsChevronDown } from "react-icons/bs";
import classes from "./NewsAdmin.module.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import NewsItem from "./components/NewsItem/NewsItem";
import { getNews } from "./API/api";
const NewsAdmin = () => {
  const [news, setNews] = useState([]);
  const [update, setUpdate] = useState(false);
  const selectedIDO = useSelector((state) => state.adminPage.selectedIDO);

  useEffect(() => {
    getNews(selectedIDO.id).then((item) => {
      setNews(item.data.news);
    });
  }, [selectedIDO.id, update]);

  return (
    <div style={{ marginTop: "1em" }}>
      <Collapsible
        trigger={["Add news", <BsChevronDown />]}
        triggerClassName={classes.collapsibleHeader}
        triggerOpenedClassName={classes.collapsibleHeaderisOpen}
        openedClassName={classes.collapsibleContent}
      >
        <NewsItem
          item={{}}
          newNews={true}
          setUpdate={setUpdate}
          update={update}
        />
      </Collapsible>
      {news.map((item) => {
        return (
          <Collapsible
            trigger={[item.title, <BsChevronDown />]}
            triggerClassName={classes.collapsibleHeader}
            triggerOpenedClassName={classes.collapsibleHeaderisOpen}
            openedClassName={classes.collapsibleContent}
          >
            <NewsItem
              item={item}
              newNews={false}
              setUpdate={setUpdate}
              update={update}
            />
          </Collapsible>
        );
      })}
    </div>
  );
};

export default NewsAdmin;
