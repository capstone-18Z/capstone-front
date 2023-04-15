import React, { useState } from 'react';
import { Button,Slider  } from "@mui/material";
function Languages({ languageValues, onLanguageValueChange }) {
    const [selectedLanguages, setSelectedLanguages] = useState({
        c: false,
        cpp: false,
        cs: false,
        java:false,
        javascript:false,
        sql:false,
        swift:false,
        kotlin:false,
        typescript:false,
        python:false,
        html:false,
        r:false
      });
    
      const toggleLanguage = (language) => {
        const isLanguageSelected = selectedLanguages[language];
        setSelectedLanguages({
          ...selectedLanguages,
          [language]: !isLanguageSelected,
        });
        if (isLanguageSelected) { // 해당 언어가 선택 해제될 때
          onLanguageValueChange({
            ...languageValues,
            [language]: 0,
          });
        }
      };
    
      const handleSliderChange = (event, language) => {
        const value = event.target.value;
        onLanguageValueChange({
          ...languageValues,
          [language]: value,
        });
      };

      const marks = [
        {
          value: 0,
          label: '아예 못함',
        },
        {
            value: 50,
            label: '보통',
          },
        {
          value: 100,
          label: '아주잘함',
        },
      ];
    
      const renderLanguageSlider = (language) => {
        if (!selectedLanguages[language]) {
          return null;
        }
    
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "100px", textAlign: "center" }}>
              {language === 'cpp' ? 'C++' : null }
              {language === 'cs' ? 'C#' : null }
              {language !== 'cpp' && language !== 'cs' ? language.toUpperCase() : null}
            </div>          
            <Slider aria-label="Custom marks" name ="sqlLang" value ={languageValues[language]} step={null} 
                    valueLabelDisplay="auto" marks={marks} onChange={(event) => handleSliderChange(event, language)} sx={{ width: "200px", marginLeft: "10px" }}/>
          </div>
        );
      };
      const lang = ['c', 'cpp', 'cs', 'java', 'javascript','sql','swift','kotlin','typescript','python','html','r']; // lang 변수가 버튼의 이름이자 서버에 넘길 값들
    
      return (
        <div>
          {lang.map(lang => ( //map함수로 여러개의 button을 생성
            <Button key={lang} variant="outlined" onClick={() => toggleLanguage(lang)}>
              {lang.toUpperCase().replace('CS', 'C#').replace('CPP','C++')}
            </Button>
          ))}
          <div>          

          </div>
          <div className='language_slidebars'>
          {lang.map((language) => (renderLanguageSlider(language)))}
          </div>
        </div>
      );
    };

export default Languages;