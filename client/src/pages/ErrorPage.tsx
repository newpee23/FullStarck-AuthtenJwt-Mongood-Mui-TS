import { Box, Button, Container, Typography } from "@mui/material";
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useNavigate } from "react-router-dom";
type Props = {};

function ErrorPage({ }: Props) {
  const navigate = useNavigate();
  return (
    <Container fixed style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Box className="text-center" style={{ textAlign: "center" }}>
        <DangerousIcon style={{ color: "red", fontSize: 100 }} />
        <Typography variant="h4" style={{ color: "red" }}>ท่านไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาเข้าสู่ระบบ</Typography>
        <Button variant="contained" className="mt-3 bg-red-600 hover:bg-red-700 text-white" onClick={() => navigate("/")}>Login Page</Button>
      </Box>
    </Container>
  );
}

export default ErrorPage;
