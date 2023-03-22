import React, { useEffect, useState, useRef } from "react";
import { Box, TextField, Button, Input } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import { Alert, Snackbar } from "@mui/material";

import { Editor } from "@tinymce/tinymce-react";

const Geography = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [friendlyUrl, setFriendlyUrl] = useState("");

  const validationSchema = object({
    title: string().required("Título da notícia é obrigatório"),
    content: string().required("Notícia é obrigatória"),
    friendlyUrl: string().required("URL amigável é obrigatória"),
    slug: string().required("URL amigável é obrigatória"),
  });

  const [sluged, setSluged] = useState("");
  const initialValues = {
    title: "",
    content: "",
    friendlyUrl: "",
    slug: "",
  };

  const [formState, setFormState] = useState({
    title: "",
    slug: "",
  });

  const generateFriendlyUrl = () => {
    if (sluged) {
      return sluged
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "") // remove caracteres especiais
        .replace(/\s+/g, "-");
    }
    return "";
  };
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSluged(value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  return (
    <Box m="1.5rem 2.5rem">
      <h1>Adicionar Portfolio</h1>

      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          autoComplete,
        }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Título do portfolio"
                name="title"
                value={sluged}
                onChange={handleInputChange}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="URL amigável"
                name="slug"
                value={generateFriendlyUrl()}
                error={touched.slug && Boolean(errors.slug)}
                helperText={touched.slug && errors.slug}
                sx={{ gridColumn: "span 4" }}
                onChange={(e) => generateFriendlyUrl(e.target.value)}
              />
              <Box gridColumn="span 4">
                <Input
                  type="file"
                  onChange={handleImageChange}
                  sx={{ display: "none" }}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button
                    component="span"
                    variant="contained"
                    style={{ marginBottom: "50px" }}
                  >
                    Selecionar imagem da Thumbnail{" "}
                  </Button>
                </label>
                {imageUrl && (
                  <Box mt={2}>
                    <img src={imageUrl} alt="Imagem selecionada" height={150} />
                  </Box>
                )}
                <Editor
                  apiKey="viiwppty89zoj2ex6gskhuivci8cq7yyjixu3v6ahicpbsuc"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  name="content"
                  error={touched.content && Boolean(errors.content)}
                  helperText={touched.content && errors.content}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    // Select the element(s) to add TinyMCE to using any valid CSS selector
                    selector: "textarea",

                    // Tip - To keep TinyMCE lean, only include the plugins you need.
                    plugins:
                      "a11ychecker advcode advlist advtable anchor autocorrect autolink autosave editimage fullscreen image link linkchecker lists media mediaembed pageembed powerpaste searchreplace table template tinymcespellchecker typography visualblocks wordcount",

                    // Configure the toolbar so it fits your app. There are many
                    // different configuration options available:
                    // https://www.tiny.cloud/docs/tinymce/6/toolbar-configuration-options/
                    toolbar:
                      "undo redo | styles | bold italic underline strikethrough | align | table link image media pageembed | bullist numlist outdent indent | spellcheckdialog a11ycheck typography code | fullscreen",

                    // Specify the height of the editor, including toolbars and the statusbar.
                    // https://www.tiny.cloud/docs/tinymce/6/customize-ui/#changing-editor-height-and-width
                    height: 540,
                  }}
                />
              </Box>

              <Button type="submit" variant="contained">
                Adicionar Portfolio
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="success">
          Portfolio adicionada com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Geography;
