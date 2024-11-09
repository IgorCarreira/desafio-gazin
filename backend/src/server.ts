import fastify from "fastify";
import { createDeveloper } from "./http/routes/developer/create-developer";
import { deleteDeveloper } from "./http/routes/developer/delete-developer";
import { listDevelopers } from "./http/routes/developer/list-developers";
import { updateDeveloper } from "./http/routes/developer/patch-developer";
import { createLevel } from "./http/routes/level/create-level";
import { deleteLevel } from "./http/routes/level/delete-level";
import { listLevels } from "./http/routes/level/list-levels";
import { updateLevel } from "./http/routes/level/patch-level";

const app = fastify();

app.register(createLevel);
app.register(updateLevel);
app.register(deleteLevel);
app.register(listLevels);

app.register(createDeveloper);
app.register(updateDeveloper);
app.register(deleteDeveloper);
app.register(listDevelopers);

app.listen({ port: 3030 }).then(() => {
  console.log("HTTP server running");
});
