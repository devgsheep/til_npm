import axios from "axios";

const photoUrl = "https://jsonplaceholder.typicode.com/photos";
const getPhotos = async () => {
  try {
    const res = await axios.get(photoUrl);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const getPhoto = async id => {
  try {
    const res = await axios.get(`${photoUrl}/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const postPhoto = async data => {
  try {
    const res = await axios.post(photoUrl, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const deletePhoto = async id => {
  try {
    const res = await axios.delete(`${photoUrl}/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const putPhoto = async (id, data) => {
  try {
    const res = await axios.put(`${photoUrl}/${id}`, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const patchPhoto = async (id, {}) => {
  try {
    const res = await axios.patch(`${photoUrl}/${id}`, {});
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
export { getPhotos, getPhoto, postPhoto, deletePhoto, putPhoto, patchPhoto };
