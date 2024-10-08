import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { TimelineOppositeContent } from "@material-ui/lab";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Image } from "@mui/icons-material";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import React, { useEffect, useState } from "react";
import { getNews } from "scenes/NewsAdmin/API/api";
import { useNavigate } from "react-router-dom";

const ProjectNews = ({ ido }) => {
  const navigate = useNavigate();
  const [placeholderData, setPlaceholderData] = useState([]);

  useEffect(() => {
    getNews(ido.id).then((item) => {
      setPlaceholderData(item.data.news);
    });
  }, []);
  return (
    <Box
      sx={{
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.089)",
        padding: "1em",
      }}
    >
      {!!placeholderData?.length && (
        <Typography variant="h4" style={{ fontSize: "1.5em" }}>
          Latest sale news:
        </Typography>
      )}
      {!placeholderData?.length && (
        <Typography
          variant="h4"
          style={{ width: "100%", textAlign: "center", fontSize: "1.5em" }}
        >
          Sorry, there are currently no news
        </Typography>
      )}
      {!!placeholderData?.length && (
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.1,
            },
          }}
        >
          {placeholderData.map((newsItem, index) => {
            return (
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                  <Typography sx={{ fontSize: "0.785rem !important" }}>
                    {new Date(newsItem.date).toLocaleDateString("en-GB")}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot sx={{ bgcolor: "#0aa7f577" }} />
                  {index !== placeholderData.length - 1 && (
                    <TimelineConnector sx={{ bgcolor: "#1ca7ff54" }} />
                  )}
                </TimelineSeparator>
                <TimelineContent
                  sx={{ mb: "1rem" }}
                  onClick={() => {
                    if (newsItem.url.includes("http")) {
                      window.open(newsItem.url, "_blank");
                    } else {
                      navigate("/news/" + newsItem.id);
                    }
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Paper elevation={1} sx={{ overflow: "hidden" }}>
                    <Grid
                      container
                      rowSpacing={0}
                      columnSpacing={"1rem"}
                      direction={"row"}
                    >
                      <Grid item>
                        <img
                          alt="complex"
                          style={{ width: "10rem", display: "flex" }}
                          src={newsItem.image_url}
                        />
                      </Grid>
                      <Grid item xs={12} sm>
                        <Typography gutterBottom variant="h5" component="div">
                          {newsItem.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {newsItem.text}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      )}
    </Box>
  );
};

export default ProjectNews;
