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

const ProjectNews = ({}) => {
  const placeholderData = [
    {
      title: "WOAH WOW WE WOWA",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula vestibulum fringilla. Curabitur in tortor libero. Nam dictum arcu eget auctor egestas. Praesent tincidunt sodales pulvinar. Phasellus quis ante lectus. ",
      image_url:
        "https://www.media.hw-static.com/media/2016/10/borat-20th-century-fox-103116.jpg",
      date: new Date(),
    },
    {
      title: "WOAH WOW WE WOWA",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula vestibulum fringilla. Curabitur in tortor libero. Nam dictum arcu eget auctor egestas. Praesent tincidunt sodales pulvinar. Phasellus quis ante lectus. ",
      image_url:
        "https://www.media.hw-static.com/media/2016/10/borat-20th-century-fox-103116.jpg",
      date: new Date(),
    },
    {
      title: "WOAH WOW WE WOWA",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula vestibulum fringilla. Curabitur in tortor libero. Nam dictum arcu eget auctor egestas. Praesent tincidunt sodales pulvinar. Phasellus quis ante lectus. ",
      image_url:
        "https://www.media.hw-static.com/media/2016/10/borat-20th-century-fox-103116.jpg",
      date: new Date(),
    },
    {
      title: "WOAH WOW WE WOWA",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula vestibulum fringilla. Curabitur in tortor libero. Nam dictum arcu eget auctor egestas. Praesent tincidunt sodales pulvinar. Phasellus quis ante lectus. ",
      image_url:
        "https://www.media.hw-static.com/media/2016/10/borat-20th-century-fox-103116.jpg",
      date: new Date(),
    },
  ];

  return (
    <Box sx={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.089)", padding: "1em" }}>
      <Typography variant="h4">
        Latest sale news:
      </Typography>
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
                  {newsItem.date.toLocaleDateString("en-GB")}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot sx={{ bgcolor: "#0aa7f577" }} />
                {index !== placeholderData.length - 1 && (
                  <TimelineConnector sx={{ bgcolor: "#1ca7ff54" }} />
                )}
              </TimelineSeparator>
              <TimelineContent sx={{ mb: "1rem" }}>
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
                        style={{ width: "10rem" }}
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
    </Box>
  );
};

export default ProjectNews;
