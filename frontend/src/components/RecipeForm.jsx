import { useForm, Controller } from "react-hook-form";
import { TextField, Button, MenuItem, Box, Grid } from "@mui/material";

const RecipeForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.table(data);
    reset();
  };

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#FFF3E0",
        boxShadow: 3,
        borderRadius: "8px",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Recipe Name"
              error={!!errors.recipeName}
              helperText={errors.recipeName?.message}
              {...register("recipeName", {
                required: "Recipe name is required",
              })}
              slotProps={{
                inputLabel: {
                  sx: { color: "#5D4037" },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#FF7043", // Warm Orange for border
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFAB91", // Soft Peach on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7043", // Warm Orange when focused
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Author"
              error={!!errors.author}
              helperText={errors.author?.message}
              {...register("author", { required: "Author is required" })}
              slotProps={{
                inputLabel: {
                  sx: { color: "#5D4037" },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#FF7043",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFAB91",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7043",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="region"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  select
                  fullWidth
                  label="Region"
                  {...field}
                  error={!!errors.region}
                  helperText={errors.region?.message}
                  slotProps={{
                    inputLabel: {
                      sx: { color: "#5D4037" },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#FF7043",
                      },
                      "&:hover fieldset": {
                        borderColor: "#FFAB91",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#FF7043",
                      },
                    },
                  }}
                >
                  <MenuItem value="">Select Region</MenuItem>
                  <MenuItem value="North America">North America</MenuItem>
                  <MenuItem value="Europe">Europe</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="cookingMethod"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  select
                  fullWidth
                  label="Cooking Method"
                  {...field}
                  error={!!errors.cookingMethod}
                  helperText={errors.cookingMethod?.message}
                  InputLabelProps={{
                    style: { color: "#5D4037" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#FF7043",
                      },
                      "&:hover fieldset": {
                        borderColor: "#FFAB91",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#FF7043",
                      },
                    },
                  }}
                >
                  <MenuItem value="">Select Cooking Method</MenuItem>
                  <MenuItem value="Baking">Baking</MenuItem>
                  <MenuItem value="Grilling">Grilling</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Preparation Time (minutes)"
              type="number"
              error={!!errors.preparationTime}
              helperText={errors.preparationTime?.message}
              {...register("preparationTime", {
                required: "Preparation time is required",
              })}
              InputLabelProps={{
                style: { color: "#5D4037" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#FF7043",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFAB91",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7043",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ingredients"
              multiline
              rows={4}
              error={!!errors.ingredients}
              helperText={errors.ingredients?.message}
              {...register("ingredients", {
                required: "Ingredients are required",
              })}
              InputLabelProps={{
                style: { color: "#5D4037" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#FF7043",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFAB91",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7043",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Instructions"
              multiline
              rows={6}
              error={!!errors.instructions}
              helperText={errors.instructions?.message}
              {...register("instructions", {
                required: "Instructions are required",
              })}
              InputLabelProps={{
                style: { color: "#5D4037" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#FF7043",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFAB91",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7043",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#FF7043", // Warm Orange for submit button
                color: "#fff",
                padding: "15px 10px",
                "&:hover": {
                  backgroundColor: "#FFAB91", // Soft Peach on hover
                },
              }}
            >
              Create Recipe
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RecipeForm;
