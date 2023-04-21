import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Button from '../Button';
import InputDiv from "../InputDiv";
import BottomNav from "../BottomNav";
import './UploadArtworkForm.css'

const UploadArtworkForm = () => {
  const artworkMaterials = [ "Oil", "Acrylic", "Multimedia", "Ballpoint Pen", "Charcoal", "Watercolor", "Pencil", "Color Pencil" ]

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUserId = useSelector(state => state.session.user.id);

  const [ title, setTitle ] = useState("");
  const [ artistName, setArtistName ] = useState("");
  const [ year, setYear ] = useState("");
  const [ height, setHeight ] = useState("");
  const [ width, setWidth ] = useState("");
  const [ available, setAvailable ] = useState("");
  const [ materials, setMaterials ] = useState("");
  const [ image, setImage ] = useState("");

  const [ errors, setErrors ] = useState({});
  const [ disableSubmit, setDisableSubmit ] = useState(true);

  // useEffect(() => {
  //   if (!name || !about || !type || !city || !state) setDisableSubmit(true);
  //   else setDisableSubmit(false);
  // }, [ name, about, type, city, state ]);

  const validate = () => {
    const validationErrors = [];
    return validationErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // const validationErrors = validate();
    // if (validationErrors.length > 0) return setErrors(validationErrors);
    // if (data.statusCode >= 400) {
    //   return setErrors([ data.message ]);
    // };
    // return;
  };

  return (
    <>
      <div>
        <div>
          <h2>UPLOAD ART</h2>
          <form enctype="multipart/form-data" onSubmit={onSubmit}>
            <div>
              <InputDiv labelFor="title" label="What is the title of this piece?">
                <input
                  name="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder={'Or leave blank if there is no name'}
                />
              </InputDiv>
              <InputDiv divStyle="" labelStyle="" labelFor="artistName" label="What is the artist's name?">
                <input
                  name="artistName"
                  type="text"
                  onChange={(e) => setArtistName(e.target.value)}
                  value={artistName}
                  placeholder="Leave blank if unknown"
                />
              </InputDiv>
              <InputDiv divStyle="" labelStyle="" labelFor="height" label='Height of this piece?'>
                <input
                  name="height"
                  type="text"
                  onChange={(e) => setHeight(e.target.value)}
                  value={height}
                  placeholder='What is the height? (h)'
                />
              </InputDiv>
              <InputDiv divStyle="" labelStyle="" labelFor="width" label='Width of this piece?'>
                <input
                  name="width"
                  type="text"
                  onChange={(e) => setWidth(e.target.value)}
                  value={width}
                  placeholder='What is the width? (w)'
                />
              </InputDiv>
            </div>
            <div>
              <InputDiv labelFor="available" label='Is this an in-person or online group?'>
                <select
                  name="available"
                  onChange={(e) => setAvailable(e.target.value)}
                  value={available}
                >
                  <option value="" disabled>
                    select:
                  </option>
                  <option value='True'>Yes</option>
                  <option value='False'>No</option>
                </select>
              </InputDiv>
              <InputDiv divStyle="" labelStyle="" labelFor="" label=''>
                <select
                  name="materials"
                  className=""
                  onChange={(e) => setMaterials(e.target.value)}
                  value={materials}
                >
                  <option value="" disabled>
                    select:
                  </option>
                  {artworkMaterials.map(material => (
                    <option key={`art-material-${material}`} value={material}>{material}</option>
                  ))}
                </select>
              </InputDiv>
              <InputDiv divStyle="" labelStyle="" labelFor="image" label='Upload an image.'>
                <input
                  id="about-input"
                  type='file'
                  name="image"
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                />
              </InputDiv>
              <div id='create-group-button-div'>
                <Button buttonStyle='btn--delete' buttonSize='btn--large'>Upload Artwork</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <BottomNav>
        <Link to={'/'} className="page-return">
          <h3>
            <i className="fa-solid fa-angle-left" />
          </h3>
        </Link>
      </BottomNav>
    </>
  );
}

export default UploadArtworkForm;
