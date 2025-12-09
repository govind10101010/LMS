import { Webhook } from "svix";
import User from "../models/User.js";

// API controller to sync Clerk with MongoDB
export const clerkWebhooks = async (req, res) => {
    try {
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify webhook signature
        await wh.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        const { data, type } = req.body;

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    imageUrl: data.image_url,
                };

                await User.create(userData);
                return res.json({ success: true });
            }

            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    imageUrl: data.image_url,
                };

                await User.findByIdAndUpdate(data.id, userData);
                return res.json({ success: true });
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                return res.json({ success: true });
            }

            default:
                return res.json({ success: true, message: "Unhandled event" });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
