// import { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import {
//   TextField,
//   Button,
//   MenuItem,
//   Box,
//   Modal,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import { masterUrls } from "../constants/API_ENDPOINTS";
// import { useCookies } from "react-cookie";

// // Custom modal styling
// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "90%",
//   maxWidth: "500px",
//   maxHeight: "90vh",
//   bgcolor: "background.paper",
//   borderRadius: "8px",
//   boxShadow: 24,
//   p: 3,
//   overflowY: "auto",
// };

// const RecipeFormModal = () => {
//   const [open, setOpen] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [ingredients, setIngredients] = useState([{ id: 1, value: "" }]);
//   const [instructions, setInstructions] = useState([{ id: 1, value: "" }]);
//   const [cookies] = useCookies(["token"]);

//   const onSubmit = async (data) => {
//     const token = cookies.token;
//     // Filter out empty ingredients and instructions
//     const filteredIngredients = data.ingredients.filter(
//       (ingredient) => ingredient.trim() !== ""
//     );
//     const filteredInstructions = data.instructions.filter(
//       (instruction) => instruction.trim() !== ""
//     );

//     // preparing the data
//     const finalData = {
//       ...data,
//       ingredients: filteredIngredients,
//       instructions: filteredInstructions,
//       preparation_time_minutes: Number(data.preparation_time_minutes),
//     };

//     try {
//       const response = await axios.post(masterUrls.createRecipe, finalData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(response);
//     } catch (err) {
//       throw err;
//     }
//     reset(); // Reset input fields
//     setIngredients([{ id: 1, value: "" }]); // Reset to first ingredient
//     setInstructions([{ id: 1, value: "" }]); // Reset to first instruction
//     setOpen(false); // Close modal after submission
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   // Function to add more ingredient fields
//   const addIngredientField = () => {
//     setIngredients([...ingredients, { id: ingredients.length + 1, value: "" }]);
//   };

//   // Function to add more instruction fields
//   const addInstructionField = () => {
//     setInstructions([
//       ...instructions,
//       { id: instructions.length + 1, value: "" },
//     ]);
//   };

//   return (
//     <>
//       {/* Button to trigger modal */}
//       <Button
//         variant="contained"
//         onClick={handleOpen}
//         sx={{
//           backgroundColor: "#FF7043",
//           "&:hover": {
//             backgroundColor: "#FFAB91",
//           },
//         }}
//       >
//         Create Recipe
//       </Button>

//       {/* Modal for the form */}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="create-recipe-modal"
//       >
//         <Box sx={modalStyle}>
//           <Typography
//             id="create-recipe-modal"
//             variant="h5"
//             component="h2"
//             mb={2}
//           >
//             Create a New Recipe
//           </Typography>

//           {/* Responsive form */}
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Box display="flex" flexDirection="column" gap={2}>
//               {/* Recipe Name */}
//               <TextField
//                 label="Recipe Name"
//                 fullWidth
//                 error={!!errors.rep_name}
//                 helperText={errors.rep_name?.message}
//                 {...register("rep_name", {
//                   required: "Recipe name is required",
//                 })}
//               />
//               {/* Region */}
//               <Controller
//                 name="region"
//                 control={control}
//                 defaultValue=""
//                 rules={{ required: "Region is required" }}
//                 render={({ field }) => (
//                   <TextField
//                     select
//                     fullWidth
//                     label="Region"
//                     {...field}
//                     error={!!errors.region}
//                     helperText={errors.region?.message}
//                   >
//                     <MenuItem value="">Select Region</MenuItem>
//                     <MenuItem value="North America">North America</MenuItem>
//                     <MenuItem value="Europe">Europe</MenuItem>
//                   </TextField>
//                 )}
//               />
//               {/* Cooking Method */}
//               <Controller
//                 name="cooking_method"
//                 control={control}
//                 defaultValue=""
//                 rules={{ required: "Cooking method is required" }}
//                 render={({ field }) => (
//                   <TextField
//                     select
//                     fullWidth
//                     label="Cooking Method"
//                     {...field}
//                     error={!!errors.cooking_method}
//                     helperText={errors.cooking_method?.message}
//                   >
//                     <MenuItem value="">Select Cooking Method</MenuItem>
//                     <MenuItem value="Baking">Baking</MenuItem>
//                     <MenuItem value="Grilling">Grilling</MenuItem>
//                   </TextField>
//                 )}
//               />
//               {/* Preparation Time */}
//               <TextField
//                 label="Preparation Time (minutes)"
//                 fullWidth
//                 type="number"
//                 error={!!errors.preparation_time_minutes}
//                 helperText={errors.preparation_time_minutes?.message}
//                 {...register("preparation_time_minutes", {
//                   required: "Preparation time is required",
//                   pattern: {
//                     value: /^(0|[1-9]\d*)$/, // Regex to ensure positive integers (0 or positive numbers)
//                     message: "Preparation time must be a positive integer",
//                   },
//                 })}
//               />
//               {/* Dynamic Ingredients */}
//               <Typography variant="h6" component="h3">
//                 Ingredients
//               </Typography>
//               {ingredients.map((ingredient, index) => (
//                 <TextField
//                   key={ingredient.id}
//                   label={`Ingredient ${index + 1}`}
//                   fullWidth
//                   error={!!errors.ingredients?.[index]}
//                   helperText={errors.ingredients?.[index]?.message}
//                   {...register(`ingredients[${index}]`, {
//                     required:
//                       index === 0
//                         ? "At least one ingredient is required"
//                         : false,
//                   })}
//                   onChange={(e) => {
//                     if (index === ingredients.length - 1 && e.target.value) {
//                       addIngredientField(); // Add new field when the last one is filled
//                     }
//                   }}
//                 />
//               ))}
//               {/* Dynamic Instructions */}
//               <Typography variant="h6" component="h3">
//                 Instructions
//               </Typography>
//               {instructions.map((instruction, index) => (
//                 <TextField
//                   key={instruction.id}
//                   label={`Instruction ${index + 1}`}
//                   fullWidth
//                   error={!!errors.instructions?.[index]}
//                   helperText={errors.instructions?.[index]?.message}
//                   {...register(`instructions[${index}]`, {
//                     required:
//                       index === 0
//                         ? "At least one instruction is required"
//                         : false,
//                   })}
//                   onChange={(e) => {
//                     if (index === instructions.length - 1 && e.target.value) {
//                       addInstructionField(); // Add new field when the last one is filled
//                     }
//                   }}
//                 />
//               ))}
//               {/* Submit Button */}
//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 sx={{
//                   backgroundColor: "#FF7043",
//                   color: "#fff",
//                   padding: "12px 10px",
//                   "&:hover": {
//                     backgroundColor: "#FFAB91",
//                   },
//                 }}
//               >
//                 Create Recipe
//               </Button>
//             </Box>
//           </form>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default RecipeFormModal;




import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";
import { masterUrls } from "../constants/API_ENDPOINTS";
import { useCookies } from "react-cookie";

// Custom modal styling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "500px",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 3,
  overflowY: "auto",
};

const RecipeFormModal = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
  const [ingredients, setIngredients] = useState([{ id: 1, value: "" }]);
  const [instructions, setInstructions] = useState([{ id: 1, value: "" }]);
  const [cookies] = useCookies(["token"]);
  const [selectedFile, setSelectedFile] = useState(null); // File state

  const onSubmit = async (data) => {
    const token = cookies.token;

    // Filter out empty ingredients and instructions
    const filteredIngredients = data.ingredients.filter(
      (ingredient) => ingredient.trim() !== ""
    );
    const filteredInstructions = data.instructions.filter(
      (instruction) => instruction.trim() !== ""
    );

    // Prepare the FormData object for file upload
    const formData = new FormData();
    formData.append("rep_name", data.rep_name);
    formData.append("region", data.region);
    formData.append("cooking_method", data.cooking_method);
    formData.append("preparation_time_minutes", data.preparation_time_minutes);
    formData.append("ingredients", JSON.stringify(filteredIngredients));
    formData.append("instructions", JSON.stringify(filteredInstructions));

    // Add the selected file to the FormData object
    if (selectedFile) {
      formData.append("file", selectedFile); // The key 'file' should match what your backend expects
    }

    try {
      const response = await axios.post(masterUrls.createRecipe, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // For file uploads
        },
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }

    reset(); // Reset input fields
    setIngredients([{ id: 1, value: "" }]); // Reset to first ingredient
    setInstructions([{ id: 1, value: "" }]); // Reset to first instruction
    setSelectedFile(null); // Reset file input
    setOpen(false); // Close modal after submission
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Store the selected file
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addIngredientField = () => {
    setIngredients([...ingredients, { id: ingredients.length + 1, value: "" }]);
  };

  const addInstructionField = () => {
    setInstructions([
      ...instructions,
      { id: instructions.length + 1, value: "" },
    ]);
  };

  return (
    <>
      {/* Button to trigger modal */}
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          backgroundColor: "#FF7043",
          "&:hover": {
            backgroundColor: "#FFAB91",
          },
        }}
      >
        Create Recipe
      </Button>

      {/* Modal for the form */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-recipe-modal"
      >
        <Box sx={modalStyle}>
          <Typography id="create-recipe-modal" variant="h5" component="h2" mb={2}>
            Create a New Recipe
          </Typography>

          {/* Responsive form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Recipe Name */}
              <TextField
                label="Recipe Name"
                fullWidth
                error={!!errors.rep_name}
                helperText={errors.rep_name?.message}
                {...register("rep_name", { required: "Recipe name is required" })}
              />
              
              {/* Region */}
              <Controller
                name="region"
                control={control}
                defaultValue=""
                rules={{ required: "Region is required" }}
                render={({ field }) => (
                  <TextField
                    select
                    fullWidth
                    label="Region"
                    {...field}
                    error={!!errors.region}
                    helperText={errors.region?.message}
                  >
                    <MenuItem value="">Select Region</MenuItem>
                    <MenuItem value="North America">North America</MenuItem>
                    <MenuItem value="Europe">Europe</MenuItem>
                  </TextField>
                )}
              />

              {/* Cooking Method */}
              <Controller
                name="cooking_method"
                control={control}
                defaultValue=""
                rules={{ required: "Cooking method is required" }}
                render={({ field }) => (
                  <TextField
                    select
                    fullWidth
                    label="Cooking Method"
                    {...field}
                    error={!!errors.cooking_method}
                    helperText={errors.cooking_method?.message}
                  >
                    <MenuItem value="">Select Cooking Method</MenuItem>
                    <MenuItem value="Baking">Baking</MenuItem>
                    <MenuItem value="Grilling">Grilling</MenuItem>
                  </TextField>
                )}
              />

              {/* Preparation Time */}
              <TextField
                label="Preparation Time (minutes)"
                fullWidth
                type="number"
                error={!!errors.preparation_time_minutes}
                helperText={errors.preparation_time_minutes?.message}
                {...register("preparation_time_minutes", {
                  required: "Preparation time is required",
                  pattern: {
                    value: /^(0|[1-9]\d*)$/, // Regex to ensure positive integers (0 or positive numbers)
                    message: "Preparation time must be a positive integer",
                  },
                })}
              />

              {/* Dynamic Ingredients */}
              <Typography variant="h6" component="h3">Ingredients</Typography>
              {ingredients.map((ingredient, index) => (
                <TextField
                  key={ingredient.id}
                  label={`Ingredient ${index + 1}`}
                  fullWidth
                  error={!!errors.ingredients?.[index]}
                  helperText={errors.ingredients?.[index]?.message}
                  {...register(`ingredients[${index}]`, {
                    required: index === 0 ? "At least one ingredient is required" : false,
                  })}
                  onChange={(e) => {
                    if (index === ingredients.length - 1 && e.target.value) {
                      addIngredientField(); // Add new field when the last one is filled
                    }
                  }}
                />
              ))}

              {/* Dynamic Instructions */}
              <Typography variant="h6" component="h3">Instructions</Typography>
              {instructions.map((instruction, index) => (
                <TextField
                  key={instruction.id}
                  label={`Instruction ${index + 1}`}
                  fullWidth
                  error={!!errors.instructions?.[index]}
                  helperText={errors.instructions?.[index]?.message}
                  {...register(`instructions[${index}]`, {
                    required: index === 0 ? "At least one instruction is required" : false,
                  })}
                  onChange={(e) => {
                    if (index === instructions.length - 1 && e.target.value) {
                      addInstructionField(); // Add new field when the last one is filled
                    }
                  }}
                />
              ))}

              {/* File Upload */}
              <input type="file" onChange={handleFileChange} accept="image/*" style={{backgoundColor:'ff7043'}}/>
              <Typography variant="h6" component="h3">
                Upload Image
              </Typography>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the default input
              />
              <label htmlFor="file-input">
                <Button
                  component="span"
                  variant="contained"
                  sx={{
                    backgroundColor: "#2196F3",
                    "&:hover": {
                      backgroundColor: "#1976D2",
                    },
                  }}
                >
                  {selectedFile ? selectedFile.name : "Choose File"}
                </Button>
              </label>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#FF7043",
                  color: "#fff",
                  padding: "12px 10px",
                  "&:hover": {
                    backgroundColor: "#FFAB91",
                  },
                }}
              >
                Create Recipe
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default RecipeFormModal;
