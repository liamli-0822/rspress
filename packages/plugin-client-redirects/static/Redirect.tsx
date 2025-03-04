import { useLocation } from '@rspress/runtime';
import { isExternalUrl } from '@rspress/shared';
import { useEffect } from 'react';

// these are types copied from src/types.ts
type RedirectRule = {
  to: string;
  from: string | string[];
};

type RedirectsOptions = {
  redirects?: RedirectRule[];
};

export default function Redirect(props: RedirectsOptions = {}) {
  const { pathname } = useLocation();
  const { redirects } = props;

  useEffect(() => {
    if (redirects) {
      for (const redirect of redirects) {
        const { from, to } = redirect;
        const fromPaths = Array.isArray(from) ? from : [from];

        fromPaths.forEach(item => {
          const regex = new RegExp(item);

          if (regex.test(pathname) && typeof window !== 'undefined') {
            if (isExternalUrl(to)) {
              window.location.replace(to);
            } else {
              window.location.replace(
                pathname.replace(regex, to) + location.hash,
              );
            }
          }
        });
      }
    }
  }, [pathname]);

  return null;
}
