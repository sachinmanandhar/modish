import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import { Notify, LocalStorage, Dialog, Loading } from "quasar";

// import "./assets/main.css";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";

// Import Quasar css
import "quasar/src/css/index.sass";
const messages = {
  en: {
    message: {
      hello: "hello world",
      gov_of_nep: "Government Of Nepal",
      ktm_nep: "Kathmandu, Nepal",
      institution_name: "INSTITUION NAME",
      home: "Home",
      dashboard: "Dashboard",
      event: "Incident",
      user_manual: "User Manual",
      volunteer_guidelines: "Volunteer Guidelines",
      sign_up: "Signup",
      downloads: "Downloads",
      job: "Programme",
      log_in: "Login",

      signup1: "Sign Up",
      signup2: "As",
      signup3: "",
      signup4: "",
      signup5: "",

      personal_info: "Personal Information",
      email: "Email",
      password: "Password",
      confirm_pass: "Confirm Password",
      first_name: "First Name",
      last_name: "Last Name",
      about: "About Yourself",
      nim: "National Identity Number",
      mobile_no: "Mobile Number",
      attach: "Attach Profile Picture",

      address_info: "Address Information",
      province: "Province",
      district: "District",
      municipality: "Municipality",
      ward: "Ward",
      street_address: "Street Address",
      associated_with_organization:
        "If Associated with any Organization. Please Mention",

      edu_info: "Educational Information",
      edu: "Education",
      core_expertise: "Core Expertise",
      training: "Training Received",
      social_media: "Social Media Profile",
      occupation: "Occupation",

      carausal_heading1: "Heading 1",
      carausal_text1: "Sub Heading 1",
      carausal_heading2: "Heading 2",
      carausal_text2: "Sub Heading 2",
      carausal_heading3: "Heading 3",
      carausal_text3: "Sub Heading 3",
      recent_events: "RECENT EVENTS",
      question1: "Are you ready to be a",
      question2: "VOLUNTEER",
      question3: "?",
      answer:
        " You can help your community and the country in the event of a disaster.Just sign up to be a volunteer and help make a difference.",
      volunteer: "Volunteers",
      stats_title: "OUR REACH BY THE NUMBERS",
      stats_one: "Reports",
      stats_two: "Jobs",
      stats_three: "Volunteers Registered",
      stats_four: "Volunteers Assigned",
      features: "Features",
      feature_one_title: "Proper Volunteer Management",
      feature_two_title: "Geospatial Visualization of Events",
      feature_three_title: "User Friendly System",
      feature_one_section_one:
        "It is built upon the concept of creating a national portal embedded with independent platforms for national, provincial, and municipal governments.",
      feature_one_section_two:
        "The system should also have features to view, download and print volunteer lists by various functions. The system should allow processing of individual as well as bulk data, and cleaning and transforming existing data, if required.",
      feature_two_section_one:
        "The National Volunteer Bureau formation and Mobilization Platform will be a robust database that houses records of all volunteers based on age, skills, preferences, and availability along with the functionality to manage (add, edit, delete).",
      feature_two_section_two:
        "The volunteer database should be interoperable with the BIPAD Portal and developed in an open-source technology. BIPAD Portal is an integrated and comprehensive Disaster Information Management System (DIMS) developed by the Government of Nepal, Ministry of Home Affairs, and is owned by National Disaster Risk Reduction and Management Authority (NDRRMA). The system should also have features to view, download and print volunteer lists by various functions. The system should allow processing of individual as well as bulk data, and cleaning and transforming existing data, if required.",
      feature_three_section_one:
        "The web-interface of the volunteer management system should be designed using a user centric approach and customizable for maximum flexibility and functionality.",
      feature_three_section_two:
        "It is built upon the concept of creating a national portal embedded with independent platforms for national, provincial, and municipal governments with a bottom-up approach of disaster data partnership focusing on the principle of user centric design.",

      footer1: "Useful Resources",
      footer1_link1: "Nepal Earthquake 2015",
      footer1_link2: "Sindhupalchowk Landslide",
      footer1_link3: "User Manual",
      footer1_link4: "Volunteer Guidelines",

      footer2: "Quick links",
      footer2_link1: "Home",
      footer2_link2: "Dashboard",
      footer2_link3: "Volunteer",
      footer2_link4: "Event",
      footer2_link5: "Bipad Portal",

      footer3: "Useful Links",
      footer3_link1: "Office of the Prime Minister and council of ministers",
      footer3_link2: "Home Ministry",
      footer3_link3: "Ministry of foreign affairs",
      footer3_link4: "Office of auditor general",
      footer3_link5: "वन तथा वातावरण मन्त्री",
      footer3_link6: "Monitor for Disaster Strategic Action plans",

      footer4: "Contact Details",
      footer4_link1:
        "National Disaster Risk Reduction and Management Authority",
      footer4_link2: "Singhadurbar, Kathmandu, Nepal",
      footer4_link3: "P.O बक्स नं. २१३२१३",
      footer4_link4: "Telephone: +977-1-4493847",
      // footer4_link5: "Email: info@bipad.gov.np",
      footer4_link6: "Web Link: www.bipad.gov.np",
      attach_cv: "Attach CV",
      education: "Education",
      attach_pp: "Attach Profile Picture",
    },
  },
  ne: {
    message: {
      job: "कार्यक्रमहरू",
      hello: "नमस्कार संसार",
      gov_of_nep: "नेपाल सरकार",
      ndrrma: "राष्ट्रिय विपद् जोखिम न्यूनीकरण तथा व्यवस्थापन प्राधिकरण",
      ktm_nep: "काठमाडौं, नेपाल",
      home: "होम",
      dashboard: "ड्यासबोर्ड",
      event: "घटना",
      sign_up: "साइन अप",
      sign_up_as: "को रूपमा साइन अप गर्नुहोस्",
      signup1: "",
      signup2: "",
      signup3: "को रूपमा",
      signup4: "साइन अप",
      signup5: "गर्नुहोस्",

      personal_info: "व्यक्तिगत जानकारी",
      email: "इमेल",
      password: "पासवर्ड",
      confirm_pass: "पासवर्ड सुनिश्चित गर्नुहोस",
      first_name: "नाम",
      last_name: "थर",
      about: "आफ्नो बारेमा",
      nim: "राष्ट्रिय पहिचान नम्बर",
      mobile_no: "मोबाइल नम्बर",
      attach_pp: "प्रोफाइल तस्वीर संलग्न गर्नुहोस्",

      address_info: "ठेगाना जानकारी",
      province: "प्रान्त",
      district: "जिल्ला",
      municipality: "नगरपालिका",
      ward: "वार्ड",
      street_address: "सडक ठेगाना",
      associated_with_organization:
        "कुनै पनि संस्थासँग सम्बन्धित भए कृपया उल्लेख गर्नुहोस्",

      edu_info: "शैक्षिक जानकारी",
      edu: "शिक्षा",
      core_expertise: "विशेषज्ञता",
      training: "तालिम प्राप्त",
      social_media: "सामाजिक संजाल प्रोफाइल",
      occupation: "पेशा",
      attach_cv: "CV संलग्न गर्नुहोस्",

      recent_events: "हालका घटनाहरू",
      carausal_heading1: "प्रकोप प्रतिक्रिया",
      carausal_text1: "विपद् जोखिम न्यूनीकरण र व्यवस्थापनका लागि परिचालन गर्ने",
      carausal_heading2: "स्वयंसेवकहरू प्रबन्ध गर्नुहोस्",
      carausal_text2:
        "स्वयंसेवक जानकारी भण्डारण गर्न प्रयोगकर्ता-मैत्री राष्ट्रिय पोर्टल",
      carausal_heading3: "नजिकका घटनाहरू पत्ता लगाउनुहोस्",
      carausal_text3: "सबै घटनाक्रम र स्वयंसेवकहरूको भूस्थानिक भिजुअलाइजेशन",
      question1: "के तपाईं ",
      question2: "VOLUNTEER",
      question3: "बन्न तयार हुनुहुन्छ?",
      user_manual: "प्रयोगकर्ता पुस्तिका",
      volunteer_guidelines: "स्वयंसेवक दिशानिर्देश",
      answer:
        "तपाईं आफ्नो समुदाय र देशलाई प्रकोपको घटनामा सहयोग गर्न सक्नुहुनेछ। एक स्वेंत्र एक स्वयंसेवक हुन र एक फरक बनाउन मद्दत गर्न Sign up गर्नुहोस्  ।",
      volunteer: "स्वयंसेवक",
      downloads: "डाउनलोडहरू",
      jobs: "जागिरहरू",
      log_in: "लग-इन",
      stats_title: "",
      stats_one: "रिपोर्टहरू",
      stats_two: "जागिरहरू",
      stats_three: "स्वयंसेवकहरू दर्ता",
      stats_four: "स्वयम्सेवक नियुक्त",
      feature_one_title: "उचित स्वयंसेवक व्यवस्थापन",
      feature_two_title: "घटनाहरूको गेस्फोत्सल दृश्य",
      feature_three_title: "प्रयोगकर्ता मैत्री प्रणाली",
      features: "विशेषताहरु",
      feature_one_section_one:
        "यो राष्ट्रिय, प्रान्तीय र नगरपालिका सरकारहरूको लागि स्वतन्त्र प्लेटफर्मको साथ राष्ट्रिय पोर्टल उत्पादन गर्ने अवधारणामा निर्मित छ।",
      feature_one_section_two:
        "प्रणालीले पनि दृश्यहरू हेर्न, डाउनलोड गर्न र प्रिन्ट गर्नुहोस् विभिन्न कार्यहरूद्वारा स्वयंसेवक सूचिहरू डाउनलोड गर्नुहोस्।प्रणालीले व्यक्तिगत रूपमा बल्क डाटाको प्रशोधन गर्न अनुमति दिनुपर्दछ, र सफा गर्ने र अवस्थित डाटा रूपान्तरण गर्नुपर्दछ, यदि आवश्यक छ भने।",
      feature_two_section_one:
        "राष्ट्रिय स्वयंसेवक ब्यूरो गठन र परिचालन डाटाबेस र परिचालन डाटाबेस जुन उमेर, प्राथमिकता, प्राथमिकता, प्राथमिकता, प्राथमिकता, प्राथमिकता, प्राथमिकता, प्राथमिकता र उपलब्धताका साथ कार्यक्षमताका साथ व्यवस्थापन गर्दछ (थप्न, सम्पादन गर्न, सम्पादन गर्नुहोस्)।",
      feature_two_section_two:
        "स्वयंसेवक डाटाबेस बिपना पोर्टलसँगको प्रसारण हुनु पर्छ र खुला स्रोत प्रविधिमा विकसित हुनुपर्दछ।नेपाल सरकारले मन्त्रालयको विकास र राष्ट्रिय प्रकोप कम जोखिम र व्यवस्थापनको लागि विकसित भएको विकास भएको विधा पोर्टल एक एकीकृत र बृहत्तर प्रवक्ता व्यवस्थापन प्रणाली हो।प्रणालीले पनि दृश्यहरू हेर्न, डाउनलोड गर्न र प्रिन्ट गर्नुहोस् विभिन्न कार्यहरूद्वारा स्वयंसेवक सूचिहरू डाउनलोड गर्नुहोस्।प्रणालीले व्यक्तिगत रूपमा बल्क डाटाको प्रशोधन गर्न अनुमति दिनुपर्दछ, र सफा गर्ने र अवस्थित डाटा रूपान्तरण गर्नुपर्दछ, यदि आवश्यक छ भने।",
      feature_three_section_one:
        "स्वयंसेवक व्यवस्थापन प्रणालीको वेब-इन्टरफेस प्रयोगकर्ता सेन्ट्रक्चर प्रयोग गरेर डिजाइन गरिनु पर्छ र अधिकतम लचिलोपन र कार्यक्षमताको लागि अनुकूलनीय हुनुपर्दछ।",
      feature_three_section_two:
        "यो राष्ट्रिय, प्रान्तीय, र प्रान्तीय डिजाइनको सिद्धान्तमा केन्द्रित विभाग डाटा साझेदारीको साथ उपयुक्त प्रतिस्पर्धाको साथ स्वतन्त्र प्लेटफाय र नगरपालिकाका साथ एक राष्ट्रिय पोर्टल उत्पादन गर्ने अवधारणामा निर्माण गरिएको छ।",

      footer1: "उपयोगी स्रोतहरू",
      footer1_link1: "नेपाल भूकम्प 2015",
      footer1_link2: "सिन्धुपाल्चोक पहिरो",
      footer1_link3: "प्रयोगकर्ता पुस्तिका",
      footer1_link4: "स्वयंसेवक दिशानिर्देश",

      footer2: "द्रुत लिङ्कहरू",
      footer2_link1: "होम",
      footer2_link2: "ड्यासबोर्ड",
      footer2_link3: "स्वयंसेवक",
      footer2_link4: "घटना",
      footer2_link5: "बिपड पोर्टल",

      footer3: "उपयोगी लिङ्कहरू",
      footer3_link1: "प्रधानमन्त्री तथा मन्त्रिपरिषद्को कार्यालय",
      footer3_link2: "गृह मन्त्रालय",
      footer3_link3: "परराष्ट्र मन्त्रालय",
      footer3_link4: "महालेखा परीक्षकको कार्यालय",
      footer3_link5: "वन तथा वातावरण मन्त्री",
      footer3_link6: "प्रकोप रणनीतिक कार्य योजनाहरूको लागि निगरानी",

      footer4: "सम्पर्क विवरणहरू",
      footer4_link1: "राष्ट्रिय विपद् जोखिम न्यूनीकरण तथा व्यवस्थापन प्राधिकरण",
      footer4_link2: "सिंहदरबार, काठमाडौं, नेपाल",
      footer4_link3: " P.O बक्स नं. २१३२१३",
      footer4_link4: "टेलिफोन: +९७७-१-४४९३८४७",
      // footer4_link5: "इमेल: info@bipad.gov.np",
      footer4_link6: "वेब लिङ्क: www.bipad.gov.np",
    },
  },
};
const i18n = createI18n({
  locale: "en", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});
const app = createApp(App);
app.use(Quasar, {
  plugins: { Notify, Dialog, LocalStorage, Loading }, // import Quasar plugins and add here
  config: {
    notify: {
      position: "top-right",
      progress: true,
      timeout: 2500,
      actions: [
        {
          icon: "close",
          color: "white",
          attrs: { round: true, "aria-label": "Close" },
        },
      ],
    },
  },
});
app.use(i18n);
app.use(createPinia());
app.use(router);
app.mount("#app");
