import {
  Box,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import axios from "axios";

const Translate = () => {
  const [fromLanguage, setFromLanguage] = useState("");
  const [toLanguage, setToLanguage] = useState("auto");
  const [translatedText, setTranslatedText] = useState("");
  const [supportedLanguages, setSupportedLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSupportedLanguages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages",
          {
            headers: {
              "X-RapidAPI-Key":
                "23d1784e46mshc497bf81794ce76p1fe74ejsn4f8f7858ceab",
              "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
            },
          }
        );
        setSupportedLanguages(response.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch supported languages:", error);
        setIsLoading(false);
      }
    };

    fetchSupportedLanguages();
  }, []);

  const handleTranslate = async () => {
    try {
      const response = await axios.post(
        "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
        {
          from: "auto",
          to: toLanguage,
          text: fromLanguage,
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key":
              "23d1784e46mshc497bf81794ce76p1fe74ejsn4f8f7858ceab",
            "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
          },
        }
      );
      setTranslatedText(response.data.trans);
      
    } catch (error) {
      console.error("Translation failed:", error);
      
    }
  };

  return (
    <div>
      <Typography variant="h3">
        <TranslateIcon
          sx={{
            height: "40px",
            width: "50px",
            backgroundColor: "orange",
            margin: "-4px 20px",
          }}
        />
        Translate the language
      </Typography>
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        style={{ padding: "5%", marginTop: "40px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">Text to Translate</Typography>
            <TextareaAutosize
              minRows={10}
              style={{ width: "100%" }}
              value={fromLanguage}
              onChange={(e) => setFromLanguage(e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">Translated Text</Typography>
            <TextareaAutosize
              minRows={10}
              style={{ width: "100%" }}
              value={translatedText}
              readOnly
            />
          </Grid>
          <Grid item xs={12} sm={6}  >
            <Typography variant="h4">Translate to</Typography>
            <TextField
              fullWidth
              select
              variant="outlined"
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
              SelectProps={{ native: true }}
            >
              {supportedLanguages.map((code, index) => (
                <option key={index} value={code.code}>
                  {code.language}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          style={{
            fontSize: "16px",
            color: "white",
            fontWeight: 600,
            borderRadius: "20px",
            padding: "10px 20px",
          }}
          onClick={handleTranslate}
        >
          Translate
        </Button>
      </Box>
    </div>
  );
};

export default Translate;
