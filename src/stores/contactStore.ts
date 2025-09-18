import { defineStore } from "pinia";

export const useContactStore = (userKey: string) =>
    defineStore(`contact-${userKey}`, {
        state: () => ({
            contact: null as { id: string; name: string; protocol: string } | null,
        }),
        persist: {
            enabled: true,
            strategies: [
                {
                    key: `contact_${userKey}`,
                    storage: sessionStorage,
                },
            ],
        },
        actions: {
            setContact(data: any) {
                if (this.contact) {
                    this.contact = { ...this.contact, ...data };
                } else {
                    this.contact = data;
                }
            },
            clearContact() {
                this.contact = null;
            },
        },
    })();
