import React from "react";
import {
  Container,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

function LoaderAjustes() {
  //Styled Components
  const PaperAnimation = {
    animation: "fade-in-down ease 0.5s",
  };
  const StyledGrid = {
    borderRadius: "20px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  const StyledItemGrid = {
    marginTop: "1.5em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Paper sx={PaperAnimation}>
      <Grid container sx={StyledGrid}>
        <Grid item xs={12} md={4} sx={StyledItemGrid}>
          <Skeleton variant="circular" width="12em" height="12em" />
        </Grid>
        <Grid mt={2} item xs={12} md={8}>
          <Stack spacing={2} m={1}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100%"
              height="3.5em"
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100%"
              height="3.5em"
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100%"
              height="3.5em"
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width="44em"
              height="0em"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={12} align="right" m={2}>
          <Skeleton variant="rounded" width="9em" height="2.5em" />
        </Grid>
      </Grid>
    </Paper>
  );
}

function LoaderDeudas() {
  //StyledComponents
  const StyledGrid = {
    animation: "fade-in-down ease 0.5s",
  };
  const StyledSkeletonCircular = { marginTop: "1em", marginLeft: "1em" };
  const StyledSkeletonRectangular = { marginTop: "1.7em", marginLeft: "1em" };
  const StyledSkeletonFinalRectangular = {
    marginBottom: "1em",
    marginRight: "1em",
  };
  const StyledStack = { alignItems: "center", marginBottom: "0.5em" };
  const StyledFinalStack = { alignItems: "flex-end" };

  return (
    <>
      <Grid sx={StyledGrid}>
        <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
            <Paper>
              <Stack width={"100%"} direction="row">
                <Skeleton
                  sx={StyledSkeletonCircular}
                  animation="wave"
                  variant="circular"
                  width={"3em"}
                  height={"3em"}
                />
                <Skeleton
                  sx={StyledSkeletonRectangular}
                  animation="wave"
                  variant="rectangular"
                  width={"10em"}
                  height={"1.5em"}
                />
              </Stack>
              <Stack sx={StyledStack}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={"8em"}
                  height={"3em"}
                />
              </Stack>
              <Stack sx={StyledFinalStack}>
                <Skeleton
                  sx={StyledSkeletonFinalRectangular}
                  animation="wave"
                  variant="rectangular"
                  width={"6em"}
                  height={"1em"}
                />
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper>
              <Stack width={"100%"} direction="row">
                <Skeleton
                  sx={StyledSkeletonCircular}
                  animation="wave"
                  variant="circular"
                  width={"3em"}
                  height={"3em"}
                />
                <Skeleton
                  sx={StyledSkeletonRectangular}
                  animation="wave"
                  variant="rectangular"
                  width={"10em"}
                  height={"1.5em"}
                />
              </Stack>
              <Stack sx={StyledStack}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={"8em"}
                  height={"3em"}
                />
              </Stack>
              <Stack sx={StyledFinalStack}>
                <Skeleton
                  sx={StyledSkeletonFinalRectangular}
                  animation="wave"
                  variant="rectangular"
                  width={"6em"}
                  height={"1em"}
                />
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper>
              <Stack width={"100%"} direction="row">
                <Skeleton
                  sx={StyledSkeletonCircular}
                  animation="wave"
                  variant="circular"
                  width={"3em"}
                  height={"3em"}
                />
                <Skeleton
                  sx={StyledSkeletonRectangular}
                  animation="wave"
                  variant="rectangular"
                  width={"10em"}
                  height={"1.5em"}
                />
              </Stack>
              <Stack sx={StyledStack}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={"8em"}
                  height={"3em"}
                />
              </Stack>
              <Stack sx={StyledFinalStack}>
                <Skeleton
                  sx={StyledSkeletonFinalRectangular}
                  animation="wave"
                  variant="rectangular"
                  width={"6em"}
                  height={"1em"}
                />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
function LoaderFinanzas() {
  //StyledComponents
  const StyledGrid = { animation: "fade-in-down ease 0.5s" };
  return (
    <Grid sx={StyledGrid}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper>
            <Stack alignItems="center" spacing={2}>
              <Skeleton
                sx={{ marginTop: "20px" }}
                animation="wave"
                variant="rectangular"
                width={"40%"}
                height="1em"
              />
              <Skeleton
                animation="wave"
                variant="circular"
                width="6em"
                height="6em"
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"40%"}
                height="2.5em"
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"40%"}
                height="1em"
              />
              <Skeleton animation="wave" variant="rectangular" height="1em" />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <Stack alignItems="center" spacing={2}>
              <Skeleton
                sx={{ marginTop: "20px" }}
                animation="wave"
                variant="rectangular"
                width={"40%"}
                height="1em"
              />
              <Skeleton
                animation="wave"
                variant="circular"
                width="6em"
                height="6em"
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"40%"}
                height="2.5em"
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"40%"}
                height="1em"
              />
              <Skeleton animation="wave" variant="rectangular" height="1em" />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <Stack alignItems="center" spacing={2}>
              <Skeleton
                sx={{ marginTop: "20px" }}
                animation="wave"
                variant="rectangular"
                width={"40%"}
                height="1em"
              />
              <Skeleton
                animation="wave"
                variant="circular"
                width="6em"
                height="6em"
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"40%"}
                height="2.5em"
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"40%"}
                height="1em"
              />
              <Skeleton animation="wave" variant="rectangular" height="1em" />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <Stack alignItems="center" spacing={2}>
              <Skeleton
                sx={{ marginTop: "20px" }}
                animation="wave"
                variant="rectangular"
                width={"40%"}
                height="1em"
              />
              <Skeleton
                animation="wave"
                variant="circular"
                width="6em"
                height="6em"
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"40%"}
                height="2.5em"
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"40%"}
                height="1em"
              />
              <Skeleton animation="wave" variant="rectangular" height="1em" />
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper>
            <Stack alignItems="center" spacing={2}>
              <Skeleton
                sx={{ marginTop: "3.4em" }}
                animation="wave"
                variant="rectangular"
                width={"40%"}
                height="2em"
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="75%"
                height="3.5em"
              />
              <Stack width={"75%"} alignItems="flex-end">
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={"25%"}
                  height="2.5em"
                />
              </Stack>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height="3.35em"
              />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Stack alignItems="center" spacing={2}>
              <Skeleton
                sx={{ marginTop: "20px" }}
                animation="wave"
                variant="rectangular"
                width={"40%"}
                height="1em"
              />
              <Skeleton
                animation="wave"
                variant="circular"
                width="9em"
                height="9em"
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"20%"}
                height="2.5em"
              />
              <Skeleton animation="wave" variant="rectangular" height="1em" />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
function LoaderGraficos() {
  //StyledComponents
  const StyledGrid = {
    animation: "fade-in-down ease 0.5s",
  };
  const StyledStack = { alignItems: "center" };
  const StyledSecondStack = { justifyContent: "space-between" };
  return (
    <>
      <Grid container sx={StyledGrid}>
        <Stack mb={1} spacing={1} width="100%">
          <Skeleton animation="wave" variant="rectangular" height={"0.2em"} />
          <Skeleton animation="wave" variant="rectangular" height={"2em"} />
          <Skeleton animation="wave" variant="rectangular" height={"0.2em"} />
          <Stack sx={StyledStack}>
            <Skeleton animation="wave" variant="rectangular">
              <Typography variant="h5">GRAFICO</Typography>
            </Skeleton>
          </Stack>
        </Stack>
        <Container>
          <Paper>
            <Skeleton animation="wave" variant="rectangular" height={"34em"} />
          </Paper>
        </Container>
        <Stack mt={2} direction="row" width={"100%"} sx={StyledSecondStack}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="5em"
            height={"3em"}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="5em"
            height={"3em"}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="5em"
            height={"3em"}
          />
        </Stack>
      </Grid>
    </>
  );
}
function LoaderHome() {
  //StyledComponents
  const StyledGrid = { animation: "fade-in-down ease 0.5s" };
  const StyledSkeletonHorizontal = { marginTop: "5%", marginBottom: "5%" };
  const StyledSkeletonFirst = { marginTop: "5%" };
  const StyledSkeletonLast = { marginBottom: "5%" };
  const StyledStackItem = { flexDirection: "row", justifyContent: "center" };
  const StyledStackInner = { alignItems: "center" };
  const StyledPaper = { borderRadius: "20px" };
  return (
    <Grid container spacing={2} sx={StyledGrid}>
      <Grid item xs={12} md={3}>
        <Paper sx={StyledPaper}>
          <Stack width="100%" sx={StyledStackItem}>
            <Stack width="35%" sx={StyledStackInner}>
              <Skeleton
                sx={StyledSkeletonHorizontal}
                animation="wave"
                variant="circular"
                width={100}
                height={100}
              />
            </Stack>
            <Stack width="65%" sx={StyledStackInner}>
              <Skeleton
                sx={StyledSkeletonFirst}
                animation="wave"
                variant="rectangular"
              >
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  align="center"
                  component="div"
                >
                  Producto vendido
                </Typography>
              </Skeleton>
              <Skeleton animation="wave" variant="rectangular">
                <Typography
                  color="text"
                  component="div"
                  variant="h4"
                  align="center"
                >
                  Mani japon
                </Typography>
              </Skeleton>
              <Skeleton
                sx={StyledSkeletonLast}
                animation="wave"
                variant="rectangular"
              >
                <Typography
                  variant="subtitle2"
                  className="subtitle-card-green"
                  component="div"
                >
                  40 de las ventas
                </Typography>
              </Skeleton>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={StyledPaper}>
          <Stack width="100%" sx={StyledStackItem}>
            <Stack width="35%" sx={StyledStackInner}>
              <Skeleton
                sx={StyledSkeletonHorizontal}
                animation="wave"
                variant="circular"
                width={100}
                height={100}
              />
            </Stack>
            <Stack width="65%" sx={StyledStackInner}>
              <Skeleton
                sx={StyledSkeletonFirst}
                animation="wave"
                variant="rectangular"
              >
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  align="center"
                  component="div"
                >
                  Producto vendido
                </Typography>
              </Skeleton>
              <Skeleton animation="wave" variant="rectangular">
                <Typography
                  color="text"
                  component="div"
                  variant="h4"
                  align="center"
                >
                  Mani japon
                </Typography>
              </Skeleton>
              <Skeleton
                sx={StyledSkeletonLast}
                animation="wave"
                variant="rectangular"
              >
                <Typography
                  variant="subtitle2"
                  className="subtitle-card-green"
                  component="div"
                >
                  40 de las ventas
                </Typography>
              </Skeleton>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={StyledPaper}>
          <Stack width="100%" sx={StyledStackItem}>
            <Stack width="35%" sx={StyledStackInner}>
              <Skeleton
                sx={StyledSkeletonHorizontal}
                animation="wave"
                variant="circular"
                width={100}
                height={100}
              />
            </Stack>
            <Stack width="65%" sx={StyledStackInner}>
              <Skeleton
                sx={StyledSkeletonFirst}
                animation="wave"
                variant="rectangular"
              >
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  align="center"
                  component="div"
                >
                  Producto vendido
                </Typography>
              </Skeleton>
              <Skeleton animation="wave" variant="rectangular">
                <Typography
                  color="text"
                  component="div"
                  variant="h4"
                  align="center"
                >
                  Mani japon
                </Typography>
              </Skeleton>
              <Skeleton
                sx={StyledSkeletonLast}
                animation="wave"
                variant="rectangular"
              >
                <Typography
                  variant="subtitle2"
                  className="subtitle-card-green"
                  component="div"
                >
                  40 de las ventas
                </Typography>
              </Skeleton>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={StyledPaper}>
          <Stack width="100%" sx={StyledStackItem}>
            <Stack width="35%" sx={StyledStackInner}>
              <Skeleton
                sx={StyledSkeletonHorizontal}
                animation="wave"
                variant="circular"
                width={100}
                height={100}
              />
            </Stack>
            <Stack width="65%" sx={StyledStackInner}>
              <Skeleton
                sx={StyledSkeletonFirst}
                animation="wave"
                variant="rectangular"
              >
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  align="center"
                  component="div"
                >
                  Producto vendido
                </Typography>
              </Skeleton>
              <Skeleton animation="wave" variant="rectangular">
                <Typography
                  color="text"
                  component="div"
                  variant="h4"
                  align="center"
                >
                  Mani japon
                </Typography>
              </Skeleton>
              <Skeleton
                sx={StyledSkeletonLast}
                animation="wave"
                variant="rectangular"
              >
                <Typography
                  variant="subtitle2"
                  className="subtitle-card-green"
                  component="div"
                >
                  40 de las ventas
                </Typography>
              </Skeleton>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
function LoaderInventario() {
  //StyledComponents
  const StyledGrid = { animation: "fade-in-down ease 0.5s" };
  const StyleditemGrid = { justifyContent: "center" };
  return (
    <Grid sx={StyledGrid}>
      <Paper>
        <Grid container spacing={2} pt={3} sx={StyleditemGrid}>
          <Grid item xs={8}>
            <Paper>
              <Skeleton variant="wave" height="3.5em" />
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper>
              <Skeleton variant="wave" height="3.5em" />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      <Grid item xs={12}>
        <Paper>
          <Container>
            <Grid container spacing={2} pt={3} pb={3} sx={StyleditemGrid}>
              <Grid item xs={12} md={4} lg={3}>
                <Skeleton variant="wave" height="16em" />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Skeleton variant="wave" height="16em" />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Skeleton variant="wave" height="16em" />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Skeleton variant="wave" height="16em" />
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}
function LoaderPedidos() {
  //StyledComponents
  const StyledGrid = {
    animation: "fade-in-down ease 0.5s",
  };

  return (
    <Grid sx={StyledGrid}>
      <Paper>
        <Grid mt={2} container spacing={2}>
          <Grid item xs={12}>
            <Stack width={"100%"}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={"3.5em"}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack width={"100%"}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={"3.5em"}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack width={"100%"}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={"3.5em"}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack width={"100%"}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={"3.5em"}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack width={"100%"}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={"3.5em"}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack width={"100%"}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={"3.5em"}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack width={"100%"}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={"3.5em"}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack width={"100%"}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={"3.5em"}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack width={"100%"}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={"3.5em"}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack width={"100%"}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={"3.5em"}
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export {
  LoaderAjustes,
  LoaderDeudas,
  LoaderFinanzas,
  LoaderGraficos,
  LoaderHome,
  LoaderInventario,
  LoaderPedidos,
};