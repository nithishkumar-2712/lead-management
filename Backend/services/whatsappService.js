// // const axios  = require("axios");
// export const sendWhatsAppMessage = async (phone, message) => {
//   console.log(phone, message)
//   try {
//     const url =
//       `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/` +
//       `${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

//     const response = await axios.post(
//       url,
//       {
//         messaging_product: "whatsapp",
//         to: phone,
//         type: "text",
//         text: {
//           body: message,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;

//   } catch (error) {
//     console.error(
//       "WhatsApp Error:",
//       error.response?.data || error.message
//     );

//     throw error;
//   }
// };