import {
  Container,
  TextInput,
  PasswordInput,
  Button,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const Admin = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: email, password: password }),
      });

      // console.log("User profile", response.data.user);
      // console.log("User token", response.data.jwt);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container size="xs">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          width: "100%",
        }}
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          required
          {...form.getInputProps("password")}
        />
        <Button type="submit">Login</Button>
      </form>
    </Container>
  );
};

export default Admin;
