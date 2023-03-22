import React, { useEffect, useState, useRef } from "react";
import { Box, TextField, Button, Input } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import { Alert, Snackbar } from "@mui/material";
import { Portfolio } from "data/mockdata";
import { Editor } from "@tinymce/tinymce-react";

const Overview = () => {
  const editorRef = useRef(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(Portfolio[0].image);

  const validationSchema = object({
    title: string().required("Título da notícia é obrigatório"),
    conteudo: string().required("Notícia é obrigatória"),
    friendlyUrl: string().required("URL amigável é obrigatória"),
    slug: string().required("URL amigável é obrigatória"),
  });

  const [sluged, setSluged] = useState("");

  const [currentBlog, setCurrentBlog] = useState(Portfolio[0]);
  const [currentBlogTitle, setCurrentBlogTitle] = useState(Portfolio[0].title);
  const [currentBlogImage, setCurrentBlogImage] = useState(Portfolio[0].image);
  const [currentBlogContent, setCurrentBlogContent] = useState(
    Portfolio[0].conteudo
  );

  const initialValues = [
    Portfolio[0].title,
    Portfolio[0].conteudo,
    Portfolio[0].slug,
    Portfolio[0].image,
  ];

  const [currentBlogUrl, setCurrentBlogUrl] = useState({
    title: currentBlog.title,
    slug: currentBlog.slug,
  });

  const generateFriendlyUrl = (param) => {
    if (param) {
      return param
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

  //toda vez o cur mudar o useEffect roda.
  useEffect(() => {
    const newString = generateFriendlyUrl(currentBlogTitle);
    setCurrentBlogUrl(newString);
  }, [currentBlogTitle]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  /*   const handleBlogChange = (blog) => {
    setCurrentBlog(blog);
    setCurrentBlogUrl({ title: blog.title, slug: blog.slug });
  }; */

  return (
    <Box m="1.5rem 2.5rem">
      <h1>Editar Portfolio</h1>

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
                name="title"
                label="Título do portfolio"
                fullWidth
                value={currentBlogTitle}
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setCurrentBlogTitle(e.target.value);
                }}
              />
              <TextField
                name="friendlyUrl"
                label="URL amigável"
                fullWidth
                variant="outlined"
                size="small"
                value={currentBlogUrl}
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
                  initialValue={currentBlogContent}
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
              <Box mt="2rem" display="flex" justifyContent="flex-start">
                <Box mr="1rem">
                  <Button variant="contained" color="secondary">
                    Cancelar
                  </Button>
                </Box>

                <Box>
                  <Button variant="contained" color="primary" type="submit">
                    Salvar
                  </Button>
                </Box>
              </Box>
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

export default Overview;
