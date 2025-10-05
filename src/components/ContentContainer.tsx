import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import AppRoutes from "../Routes.tsx";

export default function ContentContainer() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <AppRoutes />
      </Grid>
    </Container>
  );
}
