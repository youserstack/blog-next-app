import { Box, Grid, Paper, Skeleton } from "@mui/material";

export default function HomeSkeleton() {
  return (
    <main className="home-skeleton">
      <section id="hero" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Box sx={{ width: "100%", height: "300px" }}>
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} animation="wave" />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ width: "100%" }}>
            <Paper className="latest-post-list" variant="outlined" sx={{ padding: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <Skeleton variant="text" animation="wave" width={100} />
                <Skeleton variant="text" animation="wave" width={40} />
              </div>

              <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[1, 2, 3, 4, 5].map((v: any) => (
                  <Paper
                    key={v}
                    component={"li"}
                    variant="outlined"
                    sx={{ height: "100px", display: "flex", overflow: "hidden" }}
                  >
                    <Skeleton variant="rectangular" animation="wave" width={100} height={100} />

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "1rem",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ width: { xs: "30%", lg: "40%" } }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ width: { xs: "70%", lg: "80%" } }}
                      />
                    </div>
                  </Paper>
                ))}
              </ul>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: "100%" }}>
            <Paper className="latest-post-list" variant="outlined" sx={{ padding: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <Skeleton variant="text" animation="wave" width={100} />
                <Skeleton variant="text" animation="wave" width={40} />
              </div>

              <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[1, 2, 3, 4, 5].map((v: any) => (
                  <Paper
                    key={v}
                    component={"li"}
                    variant="outlined"
                    sx={{ height: "100px", display: "flex", overflow: "hidden" }}
                  >
                    <Skeleton variant="rectangular" animation="wave" width={100} height={100} />

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "1rem",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ width: { xs: "30%", lg: "40%" } }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ width: { xs: "70%", lg: "80%" } }}
                      />
                    </div>
                  </Paper>
                ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>

        <Paper className="recent-comment-list" variant="outlined" sx={{ padding: "1rem" }}>
          <Skeleton variant="text" animation="wave" width={100} sx={{ marginBottom: "1rem" }} />

          <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[1, 2, 3, 4, 5].map((v: any) => (
              <Paper
                component={"li"}
                key={v}
                variant="outlined"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                }}
              >
                <Skeleton variant="circular" animation="wave" width={30} height={30} />

                <div>
                  <Skeleton variant="text" animation="wave" width={40} height={"1rem"} />
                  <Skeleton variant="text" animation="wave" width={150} height={"0.7rem"} />
                </div>
              </Paper>
            ))}
          </ul>
        </Paper>
      </section>
    </main>
  );
}
