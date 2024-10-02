import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

function customFileNameSortAsc(a, b) {
  const reg = /\d+/g;
  const nameA = a.fileName.replace(reg, (match) => match.padStart(10, '0'));
  const nameB = b.fileName.replace(reg, (match) => match.padStart(10, '0'));
  return nameA.localeCompare(nameB);
}

function customFileNameSortDesc(a, b) {
  const reg = /\d+/g;
  const nameA = a.fileName.replace(reg, (match) => match.padStart(10, '0'));
  const nameB = b.fileName.replace(reg, (match) => match.padStart(10, '0'));
  return nameB.localeCompare(nameA);
}

async function readTextFile(filePath) {
  const absolutePath = path.join(process.cwd(), filePath);
  const fileData = await fs.readFile(absolutePath, "utf8");

  const result = fileData.trim().split("\n").map((line) => {
    const [createdAt, fileName] = line.split(";");
    return { createdAt, fileName };
  });

  return result;
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "asc";
    
    let data = await readTextFile("/public/data.csv");

    if (sortBy === "createdAt") {
      data.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return order === "asc" ? dateA - dateB : dateB - dateA;
      });
    } else if (sortBy === "fileName") {
      if (order === "asc") {
        data.sort(customFileNameSortAsc);
      } else if (order === "desc") {
        data.sort(customFileNameSortDesc);
      }
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to read the file", details: error.message },
      { status: 500 }
    );
  }
}
