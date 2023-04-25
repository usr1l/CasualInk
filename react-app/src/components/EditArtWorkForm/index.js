import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import Button from '../Button';
import InputDiv from "../InputDiv";
import BottomNav from "../BottomNav";
import { thunkEditArtwork } from "../../store/artworks";
import PageSplit from "../PageSplit";
import '../UploadArtworkForm/UploadArtworkForm.css';
import ImagePreview from "../ImagePreview";

const EditArtworkForm = () => {
  const artworkMaterials = [ "OIL", "ACRYLIC", "MULTIMEDIA", "BALLPOINT", "CHARCOAL", "WATERCOLOR", "PENCIL", "COLORPENCIL", "PRINT" ]
  const dispatch = useDispatch();
  const history = useHistory();
  const { artworkId } = useParams();
  const [ title, setTitle ] = useState("");
  const [ artistName, setArtistName ] = useState("");
  const [ year, setYear ] = useState("");
  const [ height, setHeight ] = useState("");
  const [ width, setWidth ] = useState("");
  const [ available, setAvailable ] = useState("");
  const [ materials, setMaterials ] = useState("");
  const [ image, setImage ] = useState("");
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ errors, setErrors ] = useState({});

  const artwork = useSelector(state => state.artworks.allArtworks[ artworkId ]);

  useEffect(() => {
    if (!artwork) return history.push("/not-found");
    const available = `${artwork.available}`
    setTitle(artwork.title);
    setArtistName(artwork.artistName);
    setYear(artwork.year);
    setHeight(artwork.height);
    setWidth(artwork.width);
    setAvailable(available.charAt(0).toUpperCase() + available.slice(1));
    setMaterials(artwork.materials);
    setIsLoaded(true);
  }, [ artwork ]);

  const disableBool = () => {
    if (!height ||
      !width ||
      !available ||
      !materials
    ) return true;
    return false;
  };

  const validate = () => {
    const validationErrors = [];
    return validationErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // const validationErrors = validate();
    // if (validationErrors.length > 0) return setErrors(validationErrors);


    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist_name", artistName);
    formData.append("year", year);
    formData.append("height", height);
    formData.append("width", width);
    formData.append("available", available);
    formData.append("materials", materials);
    if (image) formData.append("image", image);
    const res = dispatch(thunkEditArtwork({ formData: formData, artworkId: artworkId }))
    if (res.errors) {
      return setErrors(res.errors);
    } else return history.push(`/artworks/${artworkId}`);
  };

  const disabled = disableBool();
  return (
    <>
      {isLoaded && (
        <>
          <div className="split-pages-page">
            <h1 className="split-pages-header">EDIT ARTWORK</h1>
            <form className="split-pages-container" encType="multipart/form-data">
              <PageSplit>
                <InputDiv
                  labelFor="title"
                  label="What is the title of this piece?"
                  labelStyle={'__label'}
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
                  labelFor="height"
                  label='Height of this piece? *'>
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
                  labelFor="materials"
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
                  labelFor="image"
                  label='Upload a new image: '
                >
                  <input
                    id="image"
                    className='__input'
                    type='file'
                    name="image"
                    onChange={(e) => setImage(e.target.files[ 0 ])}
                  />
                </InputDiv>
                <ImagePreview
                  imgSrc={artwork.image}
                  imgWrapperStyle={'img--medium-wrapper'}
                  imgClassName={'img--preview-medium'}
                />
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
              >Edit Artwork
              </Button>
            </div>
          </BottomNav>
        </>
      )}
    </>
  );
}

export default EditArtworkForm;
