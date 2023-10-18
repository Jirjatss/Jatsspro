<script>
export default {
  props: ["student", "index"],
};
</script>

<template>
  <tr>
    <th>{{ index + 1 }}</th>
    <td>{{ student.username }}</td>
    <td>{{ student.email }}</td>
  </tr>
</template>

<style></style>
