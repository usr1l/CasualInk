import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Button from '../Button';
import InputDiv from "../InputDiv";
import BottomNav from "../BottomNav";
import { thunkUploadArtwork } from "../../store/artworks";
import PageSplit from "../PageSplit";
import './UploadArtworkForm.css'

const UploadArtworkForm = () => {
  const artworkMaterials = [ "OIL", "ACRYLIC", "MULTIMEDIA", "BALLPOINT", "CHARCOAL", "WATERCOLOR", "PENCIL", "COLORPENCIL", "PRINT", "PASTEL", "TEMPERA", "SILKSCREEN", "FRESCO", "MARBLE", "WOODBLOCK" ]
  const dispatch = useDispatch();
  const history = useHistory();

  const [ title, setTitle ] = useState("");
  const [ artistName, setArtistName ] = useState("");
  const [ year, setYear ] = useState("");
  const [ height, setHeight ] = useState("");
  const [ width, setWidth ] = useState("");
  const [ available, setAvailable ] = useState("");
  const [ materials, setMaterials ] = useState("");
  const [ image, setImage ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ errors, setErrors ] = useState([]);
  const [ validationErrors, setValidationErrors ] = useState({});

  const disableBool = () => {
    if (!height ||
      !width ||
      !available ||
      !materials ||
      !image ||
      !description
    ) return true;
    return false;
  };

  const validate = () => {
    const validationErrors = {};
    const yearRegex = /^\d{4}$/;

    if (title.length > 80) validationErrors.title = 'Please provide a valid title (<80 char).';
    if (title.length > 80) validationErrors.artistName = 'Please provide a valid artist name (<60 char).';
    if (!yearRegex.test(year) || year > (new Date()).getFullYear()) validationErrors.year = 'Please provide a date in the past.'
    if (description.split(" ").length < 30) validationErrors.description = 'Please provide a description (30 words min.).';
    if ((height && parseFloat(height) < 0) || (!Number.isInteger(100 * parseFloat(height)))) validationErrors.height = "Invalid height: value must be greater than zero and have at most two decimal places"
    if ((width && parseFloat(width) < 0) || (!Number.isInteger(100 * parseFloat(width)))) validationErrors.width = "Invalid height: value must be greater than zero and have at most two decimal places"
    return validationErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) return setValidationErrors(validationErrors);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist_name", artistName);
    formData.append("year", year);
    formData.append("height", height);
    formData.append("width", width);
    formData.append("available", available);
    formData.append("materials", materials);
    formData.append("description", description);
    if (image) formData.append("image", image);

    const response = await dispatch(thunkUploadArtwork(formData))
    if (response.errors) {
      console.log("==========================", response, response.errors)
      return setErrors(response.errors);
    } else history.push(`/artworks/${response.id}`);
  };

  const disabled = disableBool();
  return (
    <>
      <div className="split-pages-page">
        <h1 className="split-pages-header">UPLOAD NEW ARTWORK</h1>
        <ul className='log-in__error-list'>
          {errors.isArray && errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <form className="split-pages-container" encType="multipart/form-data">
          <PageSplit>
            <InputDiv
              labelFor="title"
              label="What is the title of this piece?"
              labelStyle={'__label'}
              error={validationErrors.title}
            >
              <input
                name="title"
                className='__input'
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder={'Or leave blank if there is no name'}
              />
            </InputDiv>
            <InputDiv
              labelStyle={'__label'}
              labelFor="artistName"
              label="What is the artist's name?"
              error={validationErrors.name}
            >
              <input
                name="artistName"
                className='__input'
                type="text"
                onChange={(e) => setArtistName(e.target.value)}
                value={artistName}
                placeholder="Leave blank if unknown"
              />
            </InputDiv>
            <InputDiv
              labelStyle={'__label'}
              labelFor="height"
              error={validationErrors.height}
              label='Height of this piece? *'
            >
              <input
                name="height"
                className='__input'
                type="number"
                onChange={(e) => setHeight(e.target.value)}
                value={height}
                placeholder='(inches)'
              />
            </InputDiv>
            <InputDiv
              labelStyle={'__label'}
              labelFor="width"
              error={validationErrors.width}
              label='Width of this piece? *'
            >
              <input
                name="width"
                className='__input'
                type="number"
                onChange={(e) => setWidth(e.target.value)}
                value={width}
                placeholder='(inches)'
              />
            </InputDiv>
            <InputDiv
              labelStyle={'__label'}
              labelFor="description"
              error={validationErrors.description}
              label="Give your piece a brief description. *"
            >
              <textarea
                name="description"
                className='__input input--long'
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="(30 words min.)"
              />
            </InputDiv>
          </PageSplit>
          <PageSplit>
            <InputDiv
              labelStyle={'__label'}
              labelFor="available"
              label='Is this available for sale/auction? *'
            >
              <select
                name="available"
                className='__input'
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
            <InputDiv
              labelStyle={'__label'}
              labelFor=""
              label='Materials Used? *'>
              <select
                name="materials"
                className='__input'
                type="text"
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
            <InputDiv
              labelStyle={'__label'}
              error={validationErrors.year}
              label="What year was this created?"
            >
              <input
                onChange={(e) => setYear(e.target.value)}
                className='__input'
                value={year}
                type="number"
                placeholder="Leave blank if unknown"
              />
            </InputDiv>

            <InputDiv
              labelStyle={'__label'}
              labelFor="image"
              label='Upload an image. *'
            >
              <input
                id="image"
                className='__input'
                type='file'
                name="image"
                onChange={(e) => setImage(e.target.files[ 0 ])}
              />
            </InputDiv>
            <div id='create-group-button-div'>
            </div>
          </PageSplit>
        </form>
      </div>
      <BottomNav>
        <Link to={'/'} className="page-return">
          <h3>
            <i className="fa-solid fa-angle-left" /> Back to Home
          </h3>
        </Link>
        <div className="page-return">
          <Button
            buttonStyle='btn--login'
            onClick={onSubmit}
            buttonSize='btn--wide'
            disableButton={disabled}
          >Upload Artwork
          </Button>
        </div>
      </BottomNav>
    </>
  );
}

export default UploadArtworkForm;
