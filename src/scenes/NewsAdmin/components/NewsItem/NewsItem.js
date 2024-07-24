import React, { useEffect, useState } from "react";
import TextInput from "scenes/Login/components/TextInput/TextInput";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import JoditEditor from "jodit-react";
import { Button } from "@mui/material";
import { putNews, deleteNews, createNews } from "scenes/NewsAdmin/API/api";
import { toast } from "react-toastify";

const NewsItem = (props) => {
  const selectedIDO = useSelector((state) => state.adminPage.selectedIDO);

  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {},
  });
  const [joditContent, setContent] = useState("");
  const config = {
    readonly: false,
  };
  useEffect(() => {
    setValue("image_url", props.item.image_url);
    setValue("title", props.item.title);
    setValue("url", props.item.url);
    setValue("text", props.item.text);
    setValue("date", props.item.date);
    setContent(props.item.pageData);
  }, [selectedIDO.contract_address, props.update]);

  return (
    <form style={{ marginTop: "1em" }}>
      <div style={{ gap: "2em", display: "grid" }}>
        <TextInput
          control={control}
          errors={errors}
          label="url"
          name="url"
          rules={{ required: true }}
        />
        <TextInput
          control={control}
          errors={errors}
          label="Image"
          name="image_url"
          rules={{ required: true }}
        />
        <TextInput
          control={control}
          errors={errors}
          label="Title"
          name="title"
          rules={{ required: true }}
        />
        <TextInput
          control={control}
          errors={errors}
          label="Description"
          name="text"
          rules={{ required: true }}
        />
        <TextInput
          control={control}
          errors={errors}
          label="date"
          name="date"
          type="date"
        />
        <JoditEditor
          value={joditContent}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => {}}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={handleSubmit(async (data) => {
              if (props.newNews) {
                const promise = createNews({
                  date: getValues("date"),
                  ido_id: selectedIDO.id,
                  text: getValues("text"),
                  title: getValues("title"),
                  url: getValues("url"),
                  pageData: joditContent,
                });
                promise.then(() => {
                  setValue("image_url", "");
                  setValue("title", "");
                  setValue("text", "");
                  setValue("date", "");
                  setValue("url", "");
                  setContent("");
                  props.setUpdate(!props.update);
                });
                toast.promise(promise, {
                  pending: "Creating",
                  success: "created",
                  error: "create failed",
                });
              } else {
                const promise = putNews(props.item.id, {
                  ...data,
                  pageData: joditContent,
                });
                toast.promise(promise, {
                  pending: "Updating",
                  success: "Update",
                  error: "Update failed",
                });
              }
            })}
            variant="contained"
            style={{
              marginRight: "1em",
              width: "10em",
            }}
          >
            {props.newNews ? "Create News" : "Update News"}
          </Button>
          {!props.newNews && (
            <Button
              onClick={handleSubmit(async () => {
                const promise = deleteNews(props.item.id);
                promise.then(() => {
                  props.setUpdate(!props.update);
                });
                toast.promise(promise, {
                  pending: "Deleting",
                  success: "Deleted",
                  error: "Delete failed",
                });
              })}
              variant="contained"
              style={{
                marginRight: "1em",
                width: "10em",
                backgroundColor: "red",
              }}
            >
              Delete News
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default React.memo(NewsItem);
