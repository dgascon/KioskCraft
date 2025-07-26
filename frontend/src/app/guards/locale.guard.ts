import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

export const localeGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const supportedLocales = ['fr-FR', 'en-US'];
  const defaultLocale = 'fr-FR';
  
  const locale = route.paramMap.get('locale');
  
  if (!locale || !supportedLocales.includes(locale)) {
    // Récupère le chemin actuel sans le paramètre locale invalide
    const currentPath = route.url.slice(1).map(segment => segment.path).join('/');
    
    // Redirige vers la locale par défaut en conservant le reste du chemin
    const redirectPath = currentPath ? `/${defaultLocale}/${currentPath}` : `/${defaultLocale}`;
    
    router.navigate([redirectPath], { replaceUrl: true });
    return false;
  }
  
  return true;
};