import { Paper, Skeleton } from "@mui/material";
import { CSSProperties } from "react";

export default function ServerLoading() {
  return (
    <main className="home">
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ height: "fit-content", display: "flex", gap: "1rem" }}>
          <div style={{ flex: "3" }}>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={"100%"}
              animation="wave"
              sx={{ minWidth: "500px", minHeight: "500px", flex: "3" }}
            />
          </div>

          <Paper className="recent-comment-list" variant="outlined" sx={commentListStyle}>
            <Skeleton variant="text" animation="wave" width={100} height={32} />

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[1, 2, 3, 4, 5].map((v: any) => (
                <Paper key={v} variant="outlined" sx={commentStyle}>
                  <Skeleton variant="circular" animation="wave" width={30} height={30} />

                  <div>
                    <Skeleton variant="text" animation="wave" width={40} height={24} />
                    <Skeleton variant="text" animation="wave" width={150} height={24} />
                  </div>
                </Paper>
              ))}
            </div>
          </Paper>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <Paper className="latest-post-list" variant="outlined" sx={popularPostListStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Skeleton variant="text" animation="wave" width={100} height={32} />
              <Skeleton variant="text" animation="wave" width={40} height={32} />
            </div>

            {[1, 2, 3, 4, 5].map((v: any) => (
              <Paper
                key={v}
                variant="outlined"
                sx={{ height: "100px", display: "flex", overflow: "hidden" }}
              >
                <Skeleton variant="rectangular" animation="wave" width={100} height={100} />

                <div className="content" style={contentStyle}>
                  <Skeleton variant="text" animation="wave" width={300} height={32} />
                  <Skeleton variant="text" animation="wave" width={250} height={16} />
                </div>
              </Paper>
            ))}
          </Paper>

          <Paper className="latest-post-list" variant="outlined" sx={latestPostList}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Skeleton variant="text" animation="wave" width={100} height={32} />
              <Skeleton variant="text" animation="wave" width={40} height={32} />
            </div>

            {[1, 2, 3, 4, 5].map((v: any) => (
              <Paper
                key={v}
                variant="outlined"
                sx={{ height: "100px", display: "flex", overflow: "hidden" }}
              >
                <Skeleton variant="rectangular" animation="wave" width={100} height={100} />

                <div className="content" style={contentStyle}>
                  <Skeleton variant="text" animation="wave" width={300} height={32} />
                  <Skeleton variant="text" animation="wave" width={250} height={16} />
                </div>
              </Paper>
            ))}
          </Paper>
        </div>
      </section>
    </main>
  );
}

const commentListStyle: CSSProperties = {
  flex: "1",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const commentStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "1rem",
};

const popularPostListStyle: CSSProperties = {
  flex: "1",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  fontSize: "12px",
};

const latestPostList: CSSProperties = {
  flex: "1",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  fontSize: "12px",
};

const contentStyle: CSSProperties = {
  flex: "1",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
