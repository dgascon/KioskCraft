import { Component, effect, inject, input } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-main-component',
    template: `
        <router-outlet />
    `,
    imports: [RouterOutlet]
})
export class MainComponent {
    private readonly translate = inject(TranslateService);

    locale = input.required<string>()

    constructor() {
        this.translate.addLangs(['fr-FR', 'en-US']);
        this.translate.setDefaultLang('fr-FR');

        effect(() => {
            this.translate.use(this.locale())
        })
    }
}