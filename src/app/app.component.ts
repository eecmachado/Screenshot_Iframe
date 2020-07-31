import { Component, ElementRef } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import html2canvas from "html2canvas";

interface ScreenShot {
	id: number;
	url: string;
}

@Component({
	selector: "app-root",
	templateUrl: './app.component.html',
	styleUrls: ["./app.component.scss"]

})
export class AppComponent {
	private elementRef: ElementRef;
	safeUrl: SafeResourceUrl;

	constructor(elementRef: ElementRef,
		private readonly sanitizer: DomSanitizer,) {
		this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.iframeUrl);
		this.elementRef = elementRef;

	}

	public gerarScreenShot(): void {
		window.scrollTo(0, 0);

		debugger;
		var target = this.elementRef.nativeElement.querySelector("#reportContainer");

		var promise = html2canvas(
			target,
			{
				logging: false,
				onclone: (doc) => {

					doc.querySelector("#reportContainer")!.classList.add("html2canvas");

				}
			}
		);

		promise
			.then(
				(canvas) => {

					var screenShot: ScreenShot = {
						id: Date.now(),
						url: canvas.toDataURL()
					};
					console.log(screenShot);
				}
			)
			.catch(
				(error) => {

					console.warn("An error occurred.");
					console.error(error);
				}
			);
	}
}
