import { NextResponse } from "next/server";
import { auth, BASE_PATH } from "@/server/auth";
import { ALL_LOCALES } from "./lib/i18n";
import createIntlMiddleware from "next-intl/middleware";

const publicPages = ["/", "/embed"];

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

const intlMiddleware = createIntlMiddleware({
  locales: ALL_LOCALES,
  localePrefix: "as-needed",
  defaultLocale: "en",
});

export default auth((req) => {
  const reqUrl = new URL(req.url);
  const publicPathnameRegex = RegExp(
    `^(/(${ALL_LOCALES.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (!req.auth && !isPublicPage) {
    return NextResponse.redirect(
      new URL(
        `${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(
          reqUrl?.pathname,
        )}`,
        req.url,
      ),
    );
  }
  return intlMiddleware(req);
});
