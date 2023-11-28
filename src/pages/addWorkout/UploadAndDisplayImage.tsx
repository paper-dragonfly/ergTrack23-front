import React, {useState} from 'react'
import { UADIProps, TypesWorkoutInfo } from  '../../utils/interfaces'



export default function UploadAndDisplayImage(props: UADIProps){
    const [numPhotos, setNumPhotos] = useState<number>(1);
    const [multiPhoto,  setMultiPhoto] = useState<boolean>(false)

    const handlePhotoSelection = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        /// When selected photo is changed, update ergImg files in WorkoutInfo state var
        const files = e.target.files;
        props.setShowError(false)
        if (files && files.length > 0) {
            const selected = Array.from(files);
            props.setWorkoutInfo((oldWorkoutInfo: TypesWorkoutInfo) => {
                const updatedPhotos = oldWorkoutInfo.ergImg 
                updatedPhotos[index] = selected[0]
                return{
                    ...oldWorkoutInfo,
                    ergImg: updatedPhotos
                }
            })
        }
      };

    
    function handleVarIntChange(){
        props.setVarInts(!props.varInts)
    }
    
    function handleMultiChange(){
        //If going from checked -> unchecked 
        if(multiPhoto){ 
            setNumPhotos(1)
            props.setNumSubs(0)
            // remove Photo2 & Photo3
            props.setWorkoutInfo((oldWorkoutInfo: TypesWorkoutInfo) => {
                return{
                    ...oldWorkoutInfo,
                    ergImg: [oldWorkoutInfo.ergImg[0]]
                }
            }) 
        }else{ //unchecked -> checked 
            setNumPhotos(2)
            props.setNumSubs(12) // 12 because it's a likely number: 6K with 500m splits
        }
        // Toggle between checked and unchecked by flipping multiPhoto state var
        setMultiPhoto(!multiPhoto)
    }

    const handleNumPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = parseInt(e.target.value, 10);
        setNumPhotos(num);
        props.setWorkoutInfo((oldWorkoutInfo: TypesWorkoutInfo) => {
            return{
                ...oldWorkoutInfo,
                ergImg: []
            }
        })
    };
    
    const handleNumSubsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = parseInt(e.target.value, 10)
        props.setNumSubs(num)  
    }

    return(
        <div className= 'visible-on-from-img'>
            <label>
                Variable Intervals {'\u00A0'}
                <input
                  type='checkbox'
                  name ='multi-photo'
                  checked = {props.varInts}
                  onChange = {handleVarIntChange}
                />
            </label>
            <br /> 
            <label>
                Multi photo workout {'\u00A0'}
                <input
                  type='checkbox'
                  name ='multi-photo'
                  checked = {multiPhoto}
                  onChange = {handleMultiChange}
                />
            </label>
            <br />
            <br />
            {multiPhoto ? 
                <div>
                    <label>
                    Number of Photos (max 3):
                    <input
                        type="number"
                        min="1"
                        max="3"
                        value={numPhotos}
                        onChange={handleNumPhotosChange}
                        className='editable-input'
                    />
                    </label>
                    <br />
                    <label>
                    Number of SubWorkouts:
                    <input
                        type="number"
                        min="1"
                        value={props.numSubs}
                        onChange={handleNumSubsChange}
                        className='editable-input'
                    />
                    </label>
                    <br />
                    <br /> 
                </div>
                :
                null
            }
            <div>
                {Array.from({ length: numPhotos }).map((_, index) => (
                <div key={index}>
                    {multiPhoto?<label>Upload Photo {index + 1}:</label>:null}
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoSelection(e, index)}
                    />
                    {props.workoutInfo.ergImg[index] && (
                    <img
                        src={URL.createObjectURL(props.workoutInfo.ergImg[index])}
                        alt={`Selected Photo ${index + 1}`}
                        // style={{ maxWidth: '150px', maxHeight: '150px' }}
                        className='uploaded-img w-5/6  mt-6 md:max-w-xl '
                    />
                    )}
                </div>
                ))}
            </div>
        </div>  
    )
}

